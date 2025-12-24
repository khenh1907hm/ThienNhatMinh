-- ============================================
-- CV Submissions Schema
-- ============================================
-- Bảng để lưu CV submissions từ trang tuyển dụng
-- ============================================

-- Bảng cv_submissions
CREATE TABLE IF NOT EXISTS cv_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  position_id UUID REFERENCES posts(id) ON DELETE SET NULL,
  position_title VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  cv_file_url TEXT NOT NULL,
  cv_file_name VARCHAR(255),
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, reviewed, contacted, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index để tối ưu query
CREATE INDEX IF NOT EXISTS idx_cv_submissions_position ON cv_submissions(position_id);
CREATE INDEX IF NOT EXISTS idx_cv_submissions_created ON cv_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cv_submissions_status ON cv_submissions(status);
CREATE INDEX IF NOT EXISTS idx_cv_submissions_email ON cv_submissions(email);

-- Row Level Security (RLS) Policies
ALTER TABLE cv_submissions ENABLE ROW LEVEL SECURITY;

-- Public có thể insert CV submissions
CREATE POLICY "Public can insert cv submissions"
  ON cv_submissions FOR INSERT
  WITH CHECK (true);

-- Admin có thể đọc tất cả (sẽ cần service_role key)
-- Note: Cần thêm policy cho admin sau khi có authentication

