import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. CV Submissions API will not work.');
}

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// PUT - Update CV submission status
export async function PUT(
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
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Thiếu thông tin: status' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'reviewed', 'contacted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Status không hợp lệ' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('cv_submissions')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase update error:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'CV submission không tồn tại' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      { 
        success: true,
        submission: data 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('CV Submission PUT error:', error);
    return NextResponse.json(
      { error: 'Không thể cập nhật CV submission' },
      { status: 500 }
    );
  }
}

