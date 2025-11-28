# 🗄️ Hướng dẫn Setup Database - Step by Step

## ✅ Bước 1: Tạo file .env.local

Tạo file `.env.local` trong thư mục root của project với nội dung:

```env
# Supabase Configuration
SUPABASE_URL=https://xfknwfgnccvnnkdtakqf.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma253ZmduY2N2bm5rZHRha3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMzI0MDAsImV4cCI6MjA3OTgwODQwMH0._MtRUIjSbMd1sGYZVQoUJC5ssqy6wr9VZvZ6HJpNPHc

# Supabase Service Role Key (lấy từ Settings > API > service_role key)
# Xem hướng dẫn trong file: HUONG_DAN_LAY_SERVICE_ROLE.md
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Resend Email Service (chưa setup - có thể để sau)
RESEND_API_KEY=your-resend-api-key-here
RESEND_FROM_EMAIL=Website <noreply@resend.dev>
CONTACT_EMAIL=your-email@gmail.com
```

**Lưu ý:** 
- File `.env.local` đã có trong `.gitignore` nên không bị commit lên Git
- Service Role Key có thể để trống tạm thời (chỉ cần khi làm admin panel)

---

## 🔑 Bước 2: Lấy Service Role Key (Optional)

**Service Role Key chỉ cần khi làm admin panel sau này. Hiện tại có thể bỏ qua.**

Xem hướng dẫn chi tiết trong file: `HUONG_DAN_LAY_SERVICE_ROLE.md`

Tóm tắt:
1. Vào Supabase Dashboard → Project của bạn
2. Settings → API
3. Tìm **service_role** key (secret)
4. Click icon 👁️ để hiện key
5. Copy và paste vào `.env.local`

---

## 📊 Bước 3: Tạo Database Tables

### Cách 1: Dùng SQL Editor (Khuyến nghị)

1. **Vào Supabase Dashboard**
   - Đăng nhập: [supabase.com](https://supabase.com)
   - Chọn project: **xfknwfgnccvnnkdtakqf**

2. **Mở SQL Editor**
   - Click **SQL Editor** ở sidebar bên trái
   - Click **New Query**

3. **Copy và Paste SQL**
   - Mở file `database-schema.sql` trong project
   - Copy **TOÀN BỘ** nội dung
   - Paste vào SQL Editor

4. **Chạy SQL**
   - Click nút **Run** (hoặc nhấn `Ctrl+Enter`)
   - Đợi vài giây để tạo bảng

5. **Kiểm tra kết quả**
   - Vào **Table Editor** ở sidebar
   - Bạn sẽ thấy 2 bảng:
     - ✅ `posts`
     - ✅ `contact_submissions`

### Cách 2: Dùng Table Editor (Nếu SQL không chạy)

1. Vào **Table Editor** → **New Table**
2. Tạo bảng `posts` với các cột:
   - `id` (uuid, primary key, default: gen_random_uuid())
   - `title` (text, not null)
   - `slug` (text, unique, not null)
   - `content` (text, not null)
   - `excerpt` (text, nullable)
   - `image` (text, nullable)
   - `category` (text, nullable)
   - `published` (boolean, default: false)
   - `created_at` (timestamptz, default: now())
   - `updated_at` (timestamptz, default: now())

3. Tạo bảng `contact_submissions` tương tự

---

## ✅ Bước 4: Kiểm tra Setup

### Test 1: Kiểm tra Environment Variables

```bash
# Chạy dev server
npm run dev
```

Mở browser: `http://localhost:3000/api/test-db`

**Kết quả mong đợi:**
```json
{
  "success": true,
  "message": "Database connection successful!",
  "details": {
    "connection": "OK",
    "tables": {
      "posts": {
        "exists": true,
        "count": 0
      },
      "contact_submissions": {
        "exists": true,
        "count": 0
      }
    }
  }
}
```

### Test 2: Test Contact Form

1. Mở: `http://localhost:3000/lien-he`
2. Điền form và submit
3. Kiểm tra:
   - ✅ Form submit thành công
   - ✅ Vào Supabase → Table Editor → `contact_submissions` → Thấy record mới

### Test 3: Test Posts API

```bash
# Get all posts (sẽ trả về mảng rỗng nếu chưa có data)
curl http://localhost:3000/api/posts

# Tạo post mới (test)
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "content": "This is a test post",
    "published": true
  }'
```

---

## 🐛 Troubleshooting

### Lỗi: "Database not configured"
- ✅ Kiểm tra file `.env.local` đã tạo chưa
- ✅ Kiểm tra `SUPABASE_URL` và `SUPABASE_ANON_KEY` đúng chưa
- ✅ Restart dev server: `npm run dev`

### Lỗi: "relation does not exist"
- ✅ Chưa chạy SQL schema
- ✅ Vào SQL Editor và chạy lại `database-schema.sql`

### Lỗi: "permission denied"
- ✅ Kiểm tra Row Level Security (RLS) policies
- ✅ Vào Supabase → Authentication → Policies
- ✅ Đảm bảo policies đã được tạo (xem trong `database-schema.sql`)

### Lỗi: "invalid API key"
- ✅ Kiểm tra lại `SUPABASE_ANON_KEY` đúng chưa
- ✅ Đảm bảo không có khoảng trắng thừa
- ✅ Copy lại key từ Supabase Dashboard

---

## 📝 Checklist Setup

- [ ] Đã tạo file `.env.local` với credentials
- [ ] Đã chạy SQL schema trong Supabase SQL Editor
- [ ] Đã test API: `http://localhost:3000/api/test-db` → `success: true`
- [ ] Đã test contact form → Submit thành công
- [ ] Đã kiểm tra data trong Supabase Table Editor

---

## 🎉 Hoàn thành!

Nếu tất cả test đều pass, bạn đã setup database thành công! 

**Next steps:**
1. Setup Resend để gửi email (xem `SETUP.md`)
2. Tạo Admin Panel để quản lý posts
3. Deploy lên Vercel

