import { NextResponse } from 'next/server';

// API route để kiểm tra environment variables (chỉ dùng trong development)
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  return NextResponse.json({
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 20)}...`
        : 'MISSING',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20)}...`
        : 'MISSING',
      SUPABASE_URL: process.env.SUPABASE_URL
        ? `${process.env.SUPABASE_URL.substring(0, 20)}...`
        : 'MISSING',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY
        ? `${process.env.SUPABASE_ANON_KEY.substring(0, 20)}...`
        : 'MISSING',
    },
    hasNextPublicUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasNextPublicKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasUrl: !!process.env.SUPABASE_URL,
    hasKey: !!process.env.SUPABASE_ANON_KEY,
  });
}

