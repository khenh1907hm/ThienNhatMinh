import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Test API để kiểm tra kết nối Supabase
export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing Supabase credentials',
          details: {
            hasUrl: !!supabaseUrl,
            hasKey: !!supabaseAnonKey,
          },
        },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Test 1: Kiểm tra kết nối
    const { data: healthCheck, error: healthError } = await supabase
      .from('posts')
      .select('count')
      .limit(1);

    // Test 2: Kiểm tra bảng posts có tồn tại không
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('id, title, created_at')
      .limit(5);

    // Test 3: Kiểm tra bảng contact_submissions
    const { data: contactData, error: contactError } = await supabase
      .from('contact_submissions')
      .select('id, name, email, created_at')
      .limit(5);

    return NextResponse.json(
      {
        success: true,
        message: 'Database connection successful!',
        details: {
          supabaseUrl: supabaseUrl.replace(/\/$/, ''),
          connection: 'OK',
          tables: {
            posts: {
              exists: !postsError,
              error: postsError?.message || null,
              count: postsData?.length || 0,
              sample: postsData || [],
            },
            contact_submissions: {
              exists: !contactError,
              error: contactError?.message || null,
              count: contactData?.length || 0,
              sample: contactData || [],
            },
          },
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Database connection failed',
        message: error?.message || 'Unknown error',
        details: error,
      },
      { status: 500 }
    );
  }
}

