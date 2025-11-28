# 🔑 Hướng dẫn CHI TIẾT lấy Service Role Key từ Supabase

## 📍 Vị trí Service Role Key

Service Role Key nằm ở: **Settings → API → Project API keys → service_role (secret)**

---

## 🎯 Bước 1: Vào Supabase Dashboard

1. Mở browser → Vào [supabase.com](https://supabase.com)
2. **Đăng nhập** vào tài khoản của bạn
3. Bạn sẽ thấy danh sách projects
4. **Click vào project**: `xfknwfgnccvnnkdtakqf` (hoặc project name của bạn)

---

## 🎯 Bước 2: Vào Settings

1. Ở **sidebar bên trái**, tìm icon **⚙️ Settings** (bánh răng)
2. **Click vào Settings**

---

## 🎯 Bước 3: Chọn API

1. Trong menu Settings, bạn sẽ thấy các mục:
   - General
   - API ⬅️ **Click vào đây**
   - Database
   - Auth
   - Storage
   - ...

2. **Click vào "API"**

---

## 🎯 Bước 4: Tìm Service Role Key

Trong trang **API Settings**, bạn sẽ thấy 3 phần:

### Phần 1: Project URL
```
Project URL
https://xfknwfgnccvnnkdtakqf.supabase.co
```
✅ Bạn đã có cái này rồi

### Phần 2: Project API keys

Đây là phần quan trọng! Bạn sẽ thấy:

```
Project API keys

┌─────────────────────────────────────────────────────────┐
│ anon / public                                           │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...                 │
│ [👁️ Reveal] [📋 Copy]                                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ service_role / secret  ⬅️ ĐÂY LÀ CÁI BẠN CẦN!           │
│ •••••••••••••••••••••••••••••••••••••••••••••••••••••• │
│ [👁️ Reveal] [📋 Copy]                                   │
└─────────────────────────────────────────────────────────┘
```

### Phần 3: Config

---

## 🎯 Bước 5: Reveal và Copy Service Role Key

1. Tìm dòng **`service_role / secret`**
2. Bạn sẽ thấy key bị ẩn: `••••••••••••••••••••••••••••`
3. **Click vào icon 👁️ (eye)** bên cạnh để **hiện key**
4. Key sẽ hiện ra dạng:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma253ZmduY2N2bm5rZHRha3FmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDIzMjQwMCwiZXhwIjoyMDc5ODA4NDAwfQ.xxxxx
   ```
5. **Click vào icon 📋 Copy** để copy key
6. Hoặc **select toàn bộ text** và copy (Ctrl+C)

---

## 🎯 Bước 6: Thêm vào .env.local

1. Mở file `.env.local` trong project
2. Tìm dòng:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```
3. Thay `your-service-role-key-here` bằng key vừa copy
4. Lưu file

---

## ⚠️ Lưu ý quan trọng

### Service Role Key có quyền gì?
- ✅ **FULL ACCESS** đến database (bypass Row Level Security)
- ✅ Có thể đọc/ghi mọi bảng
- ✅ **NGUY HIỂM** nếu bị lộ

### Khi nào cần Service Role Key?
- ❌ **KHÔNG CẦN** cho contact form (dùng ANON_KEY là đủ)
- ❌ **KHÔNG CẦN** cho public API (dùng ANON_KEY là đủ)
- ✅ **CẦN** khi làm Admin Panel (CRUD posts)
- ✅ **CẦN** khi cần bypass RLS policies

### Hiện tại có cần không?
**KHÔNG CẦN NGAY BÂY GIỜ!** 

Bạn có thể:
- Để trống: `SUPABASE_SERVICE_ROLE_KEY=`
- Hoặc comment: `# SUPABASE_SERVICE_ROLE_KEY=...`

Chỉ cần setup khi làm Admin Panel sau này.

---

## 🐛 Troubleshooting

### Không thấy "service_role" trong API Settings?

**Có thể do:**
1. Bạn đang ở project khác → Kiểm tra lại project name
2. Bạn chưa vào đúng trang → Settings → API (không phải Settings → General)
3. UI đã thay đổi → Thử refresh page (F5)

### Key bị ẩn và không reveal được?

1. Thử click vào icon 👁️ nhiều lần
2. Thử refresh page
3. Thử đăng xuất và đăng nhập lại

### Không tìm thấy Settings?

1. Kiểm tra bạn đã đăng nhập chưa
2. Kiểm tra bạn đã chọn đúng project chưa
3. Settings nằm ở sidebar bên trái (icon ⚙️)

---

## 📸 Mô tả vị trí (Text-based)

```
Supabase Dashboard
│
├── Sidebar (bên trái)
│   ├── 🏠 Home
│   ├── 📊 Table Editor
│   ├── 🔍 SQL Editor
│   ├── ⚙️ Settings  ⬅️ Click vào đây
│   │   ├── General
│   │   ├── API  ⬅️ Click vào đây
│   │   ├── Database
│   │   └── ...
│   └── ...
│
└── Main Content (bên phải)
    └── API Settings Page
        ├── Project URL: https://...
        ├── Project API keys:
        │   ├── anon / public
        │   └── service_role / secret  ⬅️ ĐÂY!
        └── Config
```

---

## ✅ Checklist

- [ ] Đã vào đúng project trong Supabase Dashboard
- [ ] Đã click Settings → API
- [ ] Đã tìm thấy "service_role / secret"
- [ ] Đã click icon 👁️ để reveal key
- [ ] Đã copy key
- [ ] Đã paste vào `.env.local`
- [ ] Đã lưu file `.env.local`

---

## 🎉 Hoàn thành!

Sau khi có Service Role Key, bạn có thể:
- ✅ Setup Admin Panel (sau này)
- ✅ Bypass RLS khi cần
- ✅ Thực hiện admin operations

**Nhưng nhớ:** Hiện tại không cần Service Role Key để chạy contact form và public API!

