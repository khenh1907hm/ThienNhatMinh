-- ============================================
-- Migration: Thêm field project_type cho bảng posts
-- ============================================
-- Copy và paste vào SQL Editor trong Supabase Dashboard
-- ============================================

-- Thêm cột project_type vào bảng posts
-- Chỉ áp dụng cho các bài viết thuộc category "Dự án"
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS project_type VARCHAR(50);

-- Tạo index để tối ưu query theo project_type
CREATE INDEX IF NOT EXISTS idx_posts_project_type ON posts(project_type) 
WHERE category = 'Dự án';

-- Comment cho cột
COMMENT ON COLUMN posts.project_type IS 'Loại dự án: "tiêu-biểu", "dang-thuc-hien", "da-thuc-hien" (chỉ áp dụng khi category = "Dự án")';

