# Hướng dẫn thêm Environment Variables vào Vercel

## Vấn đề
Khi deploy lên Vercel, bạn gặp lỗi:
```
Database not configured
Chi tiết: Supabase client is null. Please check SUPABASE_URL and SUPABASE_ANON_KEY in .env.local
```

**Nguyên nhân:** Environment variables trong `.env.local` chỉ hoạt động ở local. Trên Vercel, bạn cần thêm chúng vào Vercel Dashboard.

---

## Các Environment Variables cần thêm

### 1. Supabase Variables (Bắt buộc)

#### Server-side (cho API routes):
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Client-side (cho components):
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Resend (cho email):
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

---

## Cách thêm vào Vercel

### Bước 1: Vào Vercel Dashboard
1. Truy cập: https://vercel.com/dashboard
2. Đăng nhập vào tài khoản của bạn
3. Chọn project **ThienNhatMinh** (hoặc tên project của bạn)

### Bước 2: Vào Settings
1. Click vào tab **Settings** ở trên cùng
2. Chọn **Environment Variables** ở menu bên trái

### Bước 3: Thêm từng biến

#### Thêm SUPABASE_URL:
1. Click nút **Add New**
2. **Key:** `SUPABASE_URL`
3. **Value:** Dán URL từ Supabase (ví dụ: `https://xfknwfgnccvnnkdtakqf.supabase.co`)
4. Chọn **Environment:** 
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Click **Save**

#### Thêm SUPABASE_ANON_KEY:
1. Click nút **Add New**
2. **Key:** `SUPABASE_ANON_KEY`
3. **Value:** Dán Anon Key từ Supabase
4. Chọn **Environment:** Production, Preview, Development
5. Click **Save**

#### Thêm SUPABASE_SERVICE_ROLE_KEY:
1. Click nút **Add New**
2. **Key:** `SUPABASE_SERVICE_ROLE_KEY`
3. **Value:** Dán Service Role Key từ Supabase
4. Chọn **Environment:** Production, Preview, Development
5. Click **Save**

#### Thêm NEXT_PUBLIC_SUPABASE_URL:
1. Click nút **Add New**
2. **Key:** `NEXT_PUBLIC_SUPABASE_URL`
3. **Value:** Dán URL từ Supabase (giống SUPABASE_URL)
4. Chọn **Environment:** Production, Preview, Development
5. Click **Save**

#### Thêm NEXT_PUBLIC_SUPABASE_ANON_KEY:
1. Click nút **Add New**
2. **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Value:** Dán Anon Key từ Supabase (giống SUPABASE_ANON_KEY)
4. Chọn **Environment:** Production, Preview, Development
5. Click **Save**

#### Thêm RESEND_API_KEY (nếu có):
1. Click nút **Add New**
2. **Key:** `RESEND_API_KEY`
3. **Value:** Dán API Key từ Resend
4. Chọn **Environment:** Production, Preview, Development
5. Click **Save**

---

## Lấy giá trị từ Supabase

### 1. SUPABASE_URL và SUPABASE_ANON_KEY:
1. Vào https://supabase.com/dashboard
2. Chọn project của bạn
3. Vào **Settings** → **API**
4. Copy:
   - **Project URL** → Dùng cho `SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Dùng cho `SUPABASE_ANON_KEY` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. SUPABASE_SERVICE_ROLE_KEY:
1. Vào **Settings** → **API**
2. Tìm phần **service_role** key
3. Click **Reveal** để hiện key
4. Copy key → Dùng cho `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **Lưu ý:** Service Role Key rất quan trọng, không được expose ở client-side!

---

## Sau khi thêm xong

### 1. Redeploy
1. Vào tab **Deployments**
2. Click vào 3 chấm (⋯) của deployment mới nhất
3. Chọn **Redeploy**
4. Hoặc push code mới lên GitHub để trigger auto-deploy

### 2. Kiểm tra
1. Vào deployment mới
2. Xem logs để đảm bảo không còn lỗi
3. Test các chức năng:
   - Xem bài viết (`/tin-tuc`)
   - Gửi form liên hệ (`/lien-he`)
   - Admin panel (`/admin`)

---

## Checklist

Trước khi deploy, đảm bảo bạn đã thêm:

- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `RESEND_API_KEY` (nếu dùng email)

---

## Troubleshooting

### Vẫn báo lỗi sau khi thêm?
1. **Kiểm tra tên biến:** Đảm bảo tên chính xác (case-sensitive)
2. **Redeploy:** Environment variables chỉ áp dụng cho deployment mới
3. **Kiểm tra logs:** Vào deployment → Logs để xem chi tiết lỗi
4. **Kiểm tra Environment:** Đảm bảo đã chọn đúng environment (Production/Preview/Development)

### Lỗi "Database not configured" vẫn xuất hiện?
1. Kiểm tra lại tất cả biến đã được thêm chưa
2. Đảm bảo giá trị không có khoảng trắng thừa
3. Redeploy lại project

---

## Lưu ý quan trọng

1. **Không commit `.env.local`:** File này chứa secrets, không được push lên GitHub
2. **Mỗi environment riêng:** Có thể set giá trị khác nhau cho Production, Preview, Development
3. **Sau khi thêm:** Phải redeploy để áp dụng thay đổi
4. **Service Role Key:** Chỉ dùng ở server-side, không expose ở client

---

## Hỗ trợ

Nếu vẫn gặp vấn đề, kiểm tra:
- Vercel Dashboard → Settings → Environment Variables
- Deployment logs để xem lỗi chi tiết
- File `HUONG_DAN_LAY_SERVICE_ROLE_CHI_TIET.md` để lấy keys từ Supabase

