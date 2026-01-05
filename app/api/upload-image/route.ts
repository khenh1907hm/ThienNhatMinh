import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
// Dùng SERVICE_ROLE_KEY để bypass RLS (chỉ dùng ở server-side, an toàn)
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Upload API will not work.');
  console.warn('Please add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) to .env.local');
}

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// POST - Upload image to Supabase Storage (from file or URL)
export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const imageUrl = formData.get('imageUrl') as string;
    const folder = formData.get('folder') as string || 'posts'; // Default folder

    // Handle URL download
    if (imageUrl && !file) {
      console.log('=== Image Download from URL ===');
      console.log('URL:', imageUrl);
      
      // Validate URL
      try {
        new URL(imageUrl);
      } catch {
        return NextResponse.json(
          { error: 'URL không hợp lệ' },
          { status: 400 }
        );
      }

      // Download image from URL
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Không thể tải ảnh từ URL: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type') || 'image/jpeg';
      if (!contentType.startsWith('image/')) {
        return NextResponse.json(
          { error: 'URL không phải là ảnh hợp lệ' },
          { status: 400 }
        );
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Get file extension from URL or content type
      let fileExt = 'jpg';
      const urlPath = new URL(imageUrl).pathname;
      const urlExt = urlPath.split('.').pop()?.toLowerCase();
      if (urlExt && ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(urlExt)) {
        fileExt = urlExt;
      } else {
        // Try to get from content type
        const contentTypeExt = contentType.split('/')[1]?.split(';')[0];
        if (contentTypeExt && ['jpeg', 'jpg', 'png', 'gif', 'webp'].includes(contentTypeExt)) {
          fileExt = contentTypeExt === 'jpeg' ? 'jpg' : contentTypeExt;
        }
      }

      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      console.log('Uploading downloaded image to:', filePath);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(filePath, buffer, {
          cacheControl: '3600',
          upsert: false,
          contentType,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return NextResponse.json(
          { 
            error: 'Upload failed',
            details: uploadError.message
          },
          { status: 500 }
        );
      }

      console.log('Upload successful:', uploadData);

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('post-images')
        .getPublicUrl(uploadData.path);

      const url = publicUrlData.publicUrl;
      console.log('Public URL:', url);
      console.log('===========================');

      return NextResponse.json({
        success: true,
        url,
        path: uploadData.path,
      });
    }

    // Handle file upload (existing logic)
    if (!file) {
      return NextResponse.json(
        { error: 'No file or URL provided' },
        { status: 400 }
      );
    }

    console.log('=== Image Upload API ===');
    console.log('File:', { name: file.name, size: file.size, type: file.type });
    console.log('Folder:', folder);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('Uploading to:', filePath);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(filePath, buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json(
        { 
          error: 'Upload failed',
          details: uploadError.message
        },
        { status: 500 }
      );
    }

    console.log('Upload successful:', uploadData);

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('post-images')
      .getPublicUrl(uploadData.path);

    const url = publicUrlData.publicUrl;
    console.log('Public URL:', url);
    console.log('===========================');

    return NextResponse.json({
      success: true,
      url,
      path: uploadData.path,
    });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { 
        error: 'Upload failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

