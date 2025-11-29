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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const bySlug = searchParams.get('by') === 'slug';

    let query;
    if (bySlug) {
      query = supabase
        .from('posts')
        .select('*')
        .eq('slug', id)
        .single();
    } else {
      query = supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('=== PUT Request Received ===');
    console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set' : 'Missing');
    console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Missing');
    console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Set' : 'Missing');
    console.log('Supabase client:', supabase ? 'Initialized' : 'NULL');
    
    if (!supabase) {
      console.error('❌ Supabase not configured');
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { id } = await params;
    console.log('=== Updating Post ===');
    console.log('Post ID:', id);
    
    const body = await request.json();
    console.log('Request body:', body);
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

    console.log('Update data:', updateData);
    
    const { data, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase update error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Bài viết không tồn tại' },
          { status: 404 }
        );
      }
      throw error;
    }

    console.log('✅ Update successful:', data);

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('=== DELETE Request Received ===');
    console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set' : 'Missing');
    console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Missing');
    console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Set' : 'Missing');
    console.log('Supabase client:', supabase ? 'Initialized' : 'NULL');
    
    if (!supabase) {
      console.error('❌ Supabase not configured');
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { id } = await params;
    console.log('=== Deleting Post ===');
    console.log('Post ID:', id);

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('❌ Supabase delete error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      throw error;
    }

    console.log('✅ Delete successful');

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

