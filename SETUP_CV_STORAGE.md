# Hướng dẫn Setup Storage cho CV Files

## Vấn đề
Khi gửi CV, bạn gặp lỗi "Không thể upload CV". Nguyên nhân có thể là:
1. Bucket `cv-files` chưa được tạo trong Supabase Storage
2. Storage policies chưa được cấu hình

## Các bước setup

### Bước 1: Tạo Storage Bucket

1. Vào **Supabase Dashboard** → **Storage**
2. Click **New bucket**
3. Đặt tên: `cv-files`
4. Chọn **Public bucket**: No (hoặc Yes nếu muốn public access)
5. Click **Create bucket**

### Bước 2: Cấu hình Storage Policies

Vào **Storage** → **Policies** → Chọn bucket `cv-files`

Hoặc chạy SQL trong **SQL Editor**:

```sql
-- Cho phép public upload CV files
CREATE POLICY "Public can upload CV files"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'cv-files');

-- Cho phép public đọc CV files (nếu bucket không public)
CREATE POLICY "Public can read CV files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'cv-files');

-- Cho phép admin xóa CV files (nếu cần)
CREATE POLICY "Admin can delete CV files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'cv-files');
```

### Bước 3: Kiểm tra Environment Variables

Đảm bảo trong `.env.local` có:
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Lưu ý:** Cần dùng `SERVICE_ROLE_KEY` (không phải `ANON_KEY`) để upload file.

### Bước 4: Test

1. Vào trang `/tuyen-dung`
2. Click "Gửi CV PDF" trên một position
3. Điền form và upload file PDF
4. Kiểm tra console để xem lỗi chi tiết (nếu có)

## Troubleshooting

### Lỗi: "Bucket not found"
- **Giải pháp:** Tạo bucket `cv-files` trong Supabase Storage

### Lỗi: "new row violates row-level security"
- **Giải pháp:** Chạy SQL policies ở trên

### Lỗi: "Database not configured"
- **Giải pháp:** Kiểm tra `SUPABASE_URL` và `SUPABASE_SERVICE_ROLE_KEY` trong `.env.local`

### Lỗi: "The resource already exists"
- **Giải pháp:** File đã tồn tại, thử lại với file khác hoặc đợi vài giây

