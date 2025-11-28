# Hướng dẫn Setup Backend API

## 📋 Tổng quan

Project này sử dụng **Next.js API Routes** - backend được tích hợp sẵn trong Next.js, không cần server riêng!

## 🚀 Các bước setup

### 1. Setup Supabase (Database - FREE)

1. Vào [supabase.com](https://supabase.com) → Đăng ký/Đăng nhập
2. Tạo **New Project**
3. Chọn **Organization** → Đặt tên project → Chọn region gần nhất (Singapore)
4. Đợi database khởi tạo (2-3 phút)
5. Vào **Settings** → **API** → Copy:
   - `Project URL` → `SUPABASE_URL`
   - `anon public` key → `SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (cho admin sau này)

6. Vào **SQL Editor** → Tạo bảng:

```sql
-- Bảng posts (quản lý bài viết)
CREATE TABLE posts (
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
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index để tối ưu query
CREATE INDEX idx_posts_published ON posts(published, created_at DESC);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_contact_created ON contact_submissions(created_at DESC);
```

### 2. Setup Resend (Email Service - FREE)

1. Vào [resend.com](https://resend.com) → Đăng ký/Đăng nhập
2. Vào **API Keys** → **Create API Key**
3. Copy API key → `RESEND_API_KEY`
4. (Optional) Verify domain để dùng email custom:
   - Vào **Domains** → Add domain
   - Update DNS records
   - Dùng domain trong `RESEND_FROM_EMAIL`

### 3. Setup Environment Variables

Tạo file `.env.local` trong root project:

```env
# Supabase (Client-side - cần NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Supabase (Server-side - không cần prefix)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=Website <noreply@yourdomain.com>
CONTACT_EMAIL=your-email@gmail.com
```

**Lưu ý quan trọng:**
- `NEXT_PUBLIC_*` variables được expose ra client-side (browser), cần cho upload ảnh từ admin panel
- Server-side variables chỉ dùng trong API routes
- Có thể dùng cùng giá trị cho cả hai, nhưng phải khai báo cả hai

**Lưu ý:** 
- File `.env.local` không được commit lên Git (đã có trong `.gitignore`)
- Khi deploy lên Vercel, add các biến này vào **Settings** → **Environment Variables**

### 4. Test API Routes

#### Test Contact API:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "0123456789",
    "subject": "Test",
    "message": "This is a test message"
  }'
```

#### Test Posts API:
```bash
# Get all posts
curl http://localhost:3000/api/posts

# Get published posts only
curl http://localhost:3000/api/posts?published=true

# Get single post
curl http://localhost:3000/api/posts/{post-id}
```

## 📁 Cấu trúc API Routes

```
app/
└── api/
    ├── contact/
    │   └── route.ts          # POST /api/contact (gửi email)
    └── posts/
        ├── route.ts          # GET, POST /api/posts
        └── [id]/
            └── route.ts      # GET, PUT, DELETE /api/posts/[id]
```

## 🔒 Security Notes

1. **Authentication**: Hiện tại API posts chưa có auth. Cần thêm khi làm admin panel.
2. **Rate Limiting**: Có thể thêm rate limiting cho contact form (tránh spam).
3. **Validation**: Đã có validation cơ bản, có thể thêm Zod schema validation.

## 🚢 Deploy lên Vercel

1. Push code lên GitHub
2. Vào [vercel.com](https://vercel.com) → Import project
3. Add environment variables (Settings → Environment Variables)
4. Deploy!

**Lưu ý:** 
- Vercel tự động detect Next.js và build
- API routes sẽ chạy như serverless functions
- Free tier: 100GB bandwidth/tháng

## 📊 Free Tier Limits

| Service | Free Tier | Đủ cho |
|---------|-----------|--------|
| **Vercel** | 100GB bandwidth | ~10k-50k visitors/tháng |
| **Supabase** | 500MB database | ~1k-5k posts |
| **Resend** | 3,000 emails/tháng | ~100 emails/ngày |

## 🐛 Troubleshooting

### Email không gửi được
- Kiểm tra `RESEND_API_KEY` đúng chưa
- Kiểm tra `CONTACT_EMAIL` có đúng format không
- Xem logs trong Resend dashboard

### Database connection error
- Kiểm tra `SUPABASE_URL` và `SUPABASE_ANON_KEY`
- Kiểm tra bảng đã tạo chưa (SQL Editor)
- Kiểm tra Row Level Security (RLS) policies

### API trả về 500
- Xem logs trong Vercel dashboard
- Kiểm tra environment variables
- Test API local trước khi deploy

## 📚 Next Steps

1. ✅ Setup Supabase và Resend
2. ✅ Test API routes
3. ⏭️ Tạo Admin Panel (CRUD posts)
4. ⏭️ Thêm Authentication
5. ⏭️ Thêm Image Upload

