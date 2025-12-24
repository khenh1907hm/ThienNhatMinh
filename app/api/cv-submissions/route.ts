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

// GET - List all CV submissions
export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = supabase
      .from('cv_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

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

    return NextResponse.json(
      { 
        submissions: data || [],
        total: data?.length || 0 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ CV Submissions GET error:', error);
    return NextResponse.json(
      { 
        error: 'Không thể lấy danh sách CV',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

