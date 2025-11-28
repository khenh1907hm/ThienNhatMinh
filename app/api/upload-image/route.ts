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

// POST - Upload image to Supabase Storage
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
    const folder = formData.get('folder') as string || 'posts'; // Default folder

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
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
          details: uploadError.message,
          code: uploadError.statusCode
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

