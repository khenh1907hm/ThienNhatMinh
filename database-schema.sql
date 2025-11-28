-- ============================================
-- Supabase Database Schema
-- ============================================
-- Copy và paste vào SQL Editor trong Supabase Dashboard
-- ============================================

-- Bảng posts (quản lý bài viết/tin tức)
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image VARCHAR(500),
  category VARCHAR(100),
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng contact_submissions (lưu form submissions)
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index để tối ưu query
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);

-- Function để tự động update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger để tự động update updated_at khi update post
CREATE TRIGGER update_posts_updated_at 
  BEFORE UPDATE ON posts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Posts: Public có thể đọc published posts, chỉ admin mới write
CREATE POLICY "Public can read published posts"
  ON posts FOR SELECT
  USING (published = true);

-- (Tạm thời) Cho phép public insert/update/delete posts để dùng admin không cần auth
-- Lưu ý: Khi có hệ thống đăng nhập admin, nên giới hạn lại các policy này.
CREATE POLICY "Public can insert posts"
  ON posts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can update posts"
  ON posts FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete posts"
  ON posts FOR DELETE
  USING (true);

-- Contact submissions: Public có thể insert, chỉ admin mới đọc
CREATE POLICY "Public can insert contact submissions"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- ============================================
-- Sample Data (Optional - để test)
-- ============================================
-- INSERT INTO posts (title, slug, content, excerpt, category, published)
-- VALUES 
--   (
--     'Chào mừng đến với Thiên Nhật Minh',
--     'chao-mung-den-voi-thien-nhat-minh',
--     'Nội dung bài viết...',
--     'Mô tả ngắn...',
--     'Tin tức',
--     true
--   );

