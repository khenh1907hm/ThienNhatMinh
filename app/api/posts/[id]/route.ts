import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
// Dùng SERVICE_ROLE_KEY để bypass RLS (chỉ dùng ở server-side, an toàn)
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Posts API will not work.');
}

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// GET - Get single post by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { id } = params;
    const { searchParams } = new URL(request.url);
    const bySlug = searchParams.get('by') === 'slug';

    let query = supabase
      .from('posts')
      .select('*');

    if (bySlug) {
      query = query.eq('slug', id).single();
    } else {
      query = query.eq('id', id).single();
    }

    const { data, error } = await query;

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Bài viết không tồn tại' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json({ post: data }, { status: 200 });
  } catch (error) {
    console.error('Post GET error:', error);
    return NextResponse.json(
      { error: 'Không thể lấy bài viết' },
      { status: 500 }
    );
  }
}

// PUT - Update post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // TODO: Add authentication check
    // const authHeader = request.headers.get('authorization');
    // if (!authHeader || !isValidToken(authHeader)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { id } = params;
    const body = await request.json();
    const { title, content, excerpt, image, category, published } = body;

    // Build update object
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (title !== undefined) {
      updateData.title = title;
      // Regenerate slug if title changes
      updateData.slug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    if (content !== undefined) updateData.content = content;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (image !== undefined) updateData.image = image;
    if (category !== undefined) updateData.category = category;
    if (published !== undefined) {
      updateData.published = published === true || published === 'true';
    }

    const { data, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Bài viết không tồn tại' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      { 
        success: true,
        post: data 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Post PUT error:', error);
    
    if (error?.code === '23505') {
      return NextResponse.json(
        { error: 'Slug đã tồn tại. Vui lòng đổi tiêu đề.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Không thể cập nhật bài viết' },
      { status: 500 }
    );
  }
}

// DELETE - Delete post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // TODO: Add authentication check
    // const authHeader = request.headers.get('authorization');
    // if (!authHeader || !isValidToken(authHeader)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { id } = params;

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Bài viết đã được xóa thành công' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Post DELETE error:', error);
    return NextResponse.json(
      { error: 'Không thể xóa bài viết' },
      { status: 500 }
    );
  }
}

