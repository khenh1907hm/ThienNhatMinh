-- ============================================
-- Fix RLS Policies cho bảng posts
-- ============================================
-- Copy và paste vào SQL Editor trong Supabase Dashboard
-- ============================================

-- Xóa các policies cũ nếu có (để tránh conflict)
DROP POLICY IF EXISTS "Public can read published posts" ON posts;
DROP POLICY IF EXISTS "Public can insert posts" ON posts;
DROP POLICY IF EXISTS "Public can update posts" ON posts;
DROP POLICY IF EXISTS "Public can delete posts" ON posts;

-- Tạo lại policies đúng cách

-- 1. Cho phép SELECT tất cả posts (không chỉ published)
-- Điều này cần cho admin panel để xem tất cả bài viết
CREATE POLICY "Public can read all posts"
  ON posts FOR SELECT
  USING (true);

-- 2. Cho phép INSERT posts
CREATE POLICY "Public can insert posts"
  ON posts FOR INSERT
  WITH CHECK (true);

-- 3. Cho phép UPDATE posts
CREATE POLICY "Public can update posts"
  ON posts FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- 4. Cho phép DELETE posts
CREATE POLICY "Public can delete posts"
  ON posts FOR DELETE
  USING (true);

-- ============================================
-- Kiểm tra policies đã được tạo
-- ============================================
-- Chạy query này để xem tất cả policies:
-- SELECT * FROM pg_policies WHERE tablename = 'posts';

