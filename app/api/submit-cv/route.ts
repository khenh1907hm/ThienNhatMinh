import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit, getClientIP } from '../../lib/rate-limit';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function POST(request: NextRequest) {
  try {
    console.log('=== CV Submission API ===');
    
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const positionId = formData.get('positionId') as string;
    const positionTitle = formData.get('positionTitle') as string;
    const message = formData.get('message') as string;
    const cvFile = formData.get('cvFile') as File;

    // Validate required fields
    if (!name || !email || !cvFile) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc: name, email, cvFile' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email không hợp lệ' },
        { status: 400 }
      );
    }

    // Validate file type (only PDF)
    if (cvFile.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Chỉ chấp nhận file PDF' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (cvFile.size > maxSize) {
      return NextResponse.json(
        { error: 'File CV không được vượt quá 5MB' },
        { status: 400 }
      );
    }

    // Rate limiting by IP
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(`cv:ip:${clientIP}`, {
      maxRequests: 3, // 3 CVs
      windowMs: 60 * 60 * 1000, // per hour
    });

    if (!rateLimitResult.allowed) {
      const resetMinutes = Math.ceil((rateLimitResult.resetTime - Date.now()) / 60000);
      return NextResponse.json(
        { 
          error: `Bạn đã gửi quá nhiều CV. Vui lòng thử lại sau ${resetMinutes} phút.` 
        },
        { status: 429 }
      );
    }

    // Rate limiting by email
    const emailRateLimit = checkRateLimit(`cv:email:${email.toLowerCase()}`, {
      maxRequests: 2, // 2 CVs
      windowMs: 24 * 60 * 60 * 1000, // per day
    });

    if (!emailRateLimit.allowed) {
      const resetHours = Math.ceil((emailRateLimit.resetTime - Date.now()) / (60 * 60 * 1000));
      return NextResponse.json(
        { 
          error: `Email này đã gửi CV. Vui lòng thử lại sau ${resetHours} giờ.` 
        },
        { status: 429 }
      );
    }

    // Upload CV file to Supabase Storage
    const fileExt = cvFile.name.split('.').pop();
    const fileName = `cv-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `cvs/${fileName}`;

    const arrayBuffer = await cvFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('Uploading CV to:', filePath);
    console.log('Bucket: cv-files');
    console.log('File size:', cvFile.size, 'bytes');
    console.log('Using key:', supabaseKey ? 'SERVICE_ROLE_KEY' : 'ANON_KEY');

    // Check if bucket exists by trying to list it first
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      console.error('Error listing buckets:', bucketError);
    } else {
      const cvBucketExists = buckets?.some(b => b.name === 'cv-files');
      console.log('Bucket cv-files exists:', cvBucketExists);
      if (!cvBucketExists) {
        console.warn('⚠️ Bucket "cv-files" does not exist. Please create it in Supabase Storage.');
      }
    }

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('cv-files')
      .upload(filePath, buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'application/pdf',
      });

    if (uploadError) {
      console.error('❌ CV upload error:', uploadError);
      console.error('Error code:', uploadError.statusCode);
      console.error('Error message:', uploadError.message);
      
      // Provide helpful error messages
      let errorMessage = 'Không thể upload CV';
      if (uploadError.message?.includes('Bucket not found') || uploadError.message?.includes('not found')) {
        errorMessage = 'Bucket "cv-files" chưa được tạo. Vui lòng tạo bucket trong Supabase Storage.';
      } else if (uploadError.message?.includes('new row violates row-level security')) {
        errorMessage = 'Lỗi bảo mật Storage. Vui lòng kiểm tra Storage policies.';
      } else if (uploadError.message?.includes('The resource already exists')) {
        errorMessage = 'File CV đã tồn tại. Vui lòng thử lại.';
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: uploadError.message,
          hint: process.env.NODE_ENV === 'development' 
            ? 'Kiểm tra: 1) Bucket "cv-files" đã được tạo chưa? 2) Storage policies đã được set chưa? 3) SERVICE_ROLE_KEY đã được cấu hình chưa?'
            : undefined
        },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('cv-files')
      .getPublicUrl(uploadData.path);

    const cvFileUrl = publicUrlData.publicUrl;
    console.log('CV uploaded successfully:', cvFileUrl);

    // Save submission to database
    const { data: submissionData, error: dbError } = await supabase
      .from('cv_submissions')
      .insert([
        {
          position_id: positionId || null,
          position_title: positionTitle || null,
          name,
          email,
          phone: phone || null,
          cv_file_url: cvFileUrl,
          cv_file_name: cvFile.name,
          message: message || null,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      // Try to delete uploaded file if DB insert fails
      await supabase.storage.from('cv-files').remove([filePath]);
      
      return NextResponse.json(
        { 
          error: 'Không thể lưu thông tin CV',
          details: dbError.message
        },
        { status: 500 }
      );
    }

    console.log('✅ CV submission saved:', submissionData.id);

    return NextResponse.json(
      { 
        success: true,
        message: 'CV của bạn đã được gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.',
        submissionId: submissionData.id
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ CV submission error:', error);
    return NextResponse.json(
      { 
        error: 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    );
  }
}

