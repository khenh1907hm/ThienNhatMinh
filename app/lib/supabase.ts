import { createClient } from '@supabase/supabase-js';

// Client-side cần NEXT_PUBLIC_ prefix
// Lưu ý: Trong Next.js, NEXT_PUBLIC_ variables được expose tự động ở client-side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

// Log để debug (chỉ log ở client-side)
if (typeof window !== 'undefined') {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase environment variables are missing!', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      urlValue: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'undefined',
      keyValue: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'undefined',
    });
    console.error('💡 Hãy đảm bảo bạn đã:');
    console.error('1. Thêm NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY vào .env.local');
    console.error('2. Restart dev server (Ctrl+C rồi chạy lại npm run dev)');
    console.error('3. Xem file HUONG_DAN_FIX_ENV.md để biết chi tiết');
  } else {
    console.log('✅ Supabase configured successfully');
  }
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!supabase;
};

