import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
// Dùng SERVICE_ROLE_KEY để bypass RLS (chỉ dùng ở server-side, an toàn)
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Posts API will not work.');
  console.warn('Please add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) to .env.local');
}

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// GET - List all posts (public)
export async function GET(request: NextRequest) {
  try {
    console.log('=== Posts API GET Request ===');
    console.log('Supabase client:', supabase ? 'Initialized' : 'NULL');
    console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set' : 'Missing');
    console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Set' : 'Missing');

    if (!supabase) {
      console.error('❌ Database not configured - Supabase client is null');
      return NextResponse.json(
        { 
          error: 'Database not configured',
          details: 'Supabase client is null. Please check SUPABASE_URL and SUPABASE_ANON_KEY in .env.local'
        },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100'); // Tăng limit để lấy tất cả
    const offset = parseInt(searchParams.get('offset') || '0');
    const published = searchParams.get('published'); // 'true' or 'false' or null (all)
    const category = searchParams.get('category');

    console.log('Query params:', { limit, offset, published, category });

    // Note: RLS policy should allow SELECT all posts for admin
    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by published status
    if (published === 'true') {
      query = query.eq('published', true);
    } else if (published === 'false') {
      query = query.eq('published', false);
    }

    // Filter by category
    if (category) {
      query = query.eq('category', category);
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    console.log('Executing Supabase query...');
    const { data, error } = await query;

    if (error) {
      console.error('❌ Supabase query error:', error);
      return NextResponse.json(
        { 
          error: 'Database query failed',
          details: error.message,
          code: error.code
        },
        { status: 500 }
      );
    }

    console.log(`✅ Successfully fetched ${data?.length || 0} posts`);
    console.log('===========================');

    return NextResponse.json(
      { 
        posts: data || [],
        total: data?.length || 0 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Posts GET error:', error);
    return NextResponse.json(
      { 
        error: 'Không thể lấy danh sách bài viết',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Create new post (requires auth in production)
export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // TODO: Add authentication check here
    // const authHeader = request.headers.get('authorization');
    // if (!authHeader || !isValidToken(authHeader)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await request.json();
    const { title, content, excerpt, image, category, published = false } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc: title, content' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    console.log('=== Creating Post ===');
    console.log('Data:', { title, slug, category, published });

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title,
          slug,
          content,
          excerpt: excerpt || null,
          image: image || null,
          category: category || null,
          published: published === true || published === 'true',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase insert error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Nếu là lỗi RLS, hướng dẫn user
      if (error.code === '42501') {
        return NextResponse.json(
          { 
            error: 'Row Level Security policy violation',
            details: error.message,
            hint: 'Please run fix-rls-policies.sql in Supabase SQL Editor to fix RLS policies'
          },
          { status: 403 }
        );
      }
      
      throw error;
    }

    console.log('✅ Post created successfully:', data.id);

    return NextResponse.json(
      { 
        success: true,
        post: data 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Posts POST error:', error);
    
    // Handle duplicate slug
    if (error?.code === '23505') {
      return NextResponse.json(
        { error: 'Slug đã tồn tại. Vui lòng đổi tiêu đề.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Không thể tạo bài viết' },
      { status: 500 }
    );
  }
}

