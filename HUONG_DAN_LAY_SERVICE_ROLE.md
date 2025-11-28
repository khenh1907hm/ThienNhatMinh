# 🔑 Hướng dẫn lấy Service Role Key từ Supabase

## Bước 1: Vào Supabase Dashboard

1. Đăng nhập vào [supabase.com](https://supabase.com)
2. Chọn project của bạn: **xfknwfgnccvnnkdtakqf**

## Bước 2: Vào Settings > API

1. Click vào **Settings** (biểu tượng bánh răng) ở sidebar bên trái
2. Click vào **API** trong menu Settings

## Bước 3: Tìm Service Role Key

Trong trang API Settings, bạn sẽ thấy 3 keys:

1. **Project URL** ✅ (Bạn đã có: `https://xfknwfgnccvnnkdtakqf.supabase.co`)
2. **anon public** key ✅ (Bạn đã có)
3. **service_role** key ⚠️ (Cần lấy)

### Service Role Key ở đâu?

- Scroll xuống phần **Project API keys**
- Tìm dòng **`service_role`** (secret)
- Click vào icon **👁️** (eye) để hiện key
- Click **Copy** để copy key

⚠️ **Lưu ý quan trọng:**
- Service Role Key có quyền **FULL ACCESS** đến database
- **KHÔNG BAO GIỜ** commit key này lên Git
- Chỉ dùng cho admin operations (sau này)
- Hiện tại có thể để trống, chỉ cần ANON_KEY là đủ

## Bước 4: Thêm vào .env.local

Mở file `.env.local` và thêm:

```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma253ZmduY2N2bm5rZHRha3FmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDIzMjQwMCwiZXhwIjoyMDc5ODA4NDAwfQ.xxxxx
```

(Thay `xxxxx` bằng key thật của bạn)

---

## 📝 Setup Database Schema

Sau khi có credentials, cần tạo bảng trong database:

1. Vào **SQL Editor** trong Supabase Dashboard
2. Click **New Query**
3. Copy toàn bộ nội dung từ file `database-schema.sql`
4. Paste vào SQL Editor
5. Click **Run** (hoặc Ctrl+Enter)

## ✅ Kiểm tra đã setup đúng chưa

Sau khi setup xong, test bằng cách:

1. Chạy dev server: `npm run dev`
2. Mở browser: `http://localhost:3000/api/test-db`
3. Xem kết quả:
   - ✅ Nếu thấy `"success": true` → Đã setup đúng!
   - ❌ Nếu thấy lỗi → Kiểm tra lại credentials và SQL schema

