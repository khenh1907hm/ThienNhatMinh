import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// API route để test kết nối database và xem có dữ liệu không
export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    console.log('=== Test Posts Connection ===');
    console.log('SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
    console.log('SUPABASE_ANON_KEY:', supabaseKey ? 'Set' : 'Missing');

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        success: false,
        error: 'Missing Supabase credentials',
        details: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey,
        },
        message: 'Please add SUPABASE_URL and SUPABASE_ANON_KEY to .env.local and restart server',
      }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test 1: Count total posts
    const { count, error: countError } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Count error:', countError);
      return NextResponse.json({
        success: false,
        error: 'Database query failed',
        details: countError.message,
        code: countError.code,
      }, { status: 500 });
    }

    // Test 2: Get all posts
    const { data, error: dataError } = await supabase
      .from('posts')
      .select('id, title, published, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (dataError) {
      console.error('Data error:', dataError);
      return NextResponse.json({
        success: false,
        error: 'Database query failed',
        details: dataError.message,
        code: dataError.code,
      }, { status: 500 });
    }

    console.log(`✅ Found ${count} total posts`);
    console.log(`✅ Retrieved ${data?.length || 0} posts`);
    console.log('===========================');

    return NextResponse.json({
      success: true,
      totalPosts: count || 0,
      retrievedPosts: data?.length || 0,
      posts: data || [],
      message: `Successfully connected to database. Found ${count} total posts.`,
    });
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Unexpected error',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

