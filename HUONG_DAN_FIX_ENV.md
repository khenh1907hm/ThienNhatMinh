# 🔧 Hướng dẫn sửa lỗi Environment Variables

## ❌ Lỗi: "Supabase environment variables are missing!"

### Nguyên nhân:
Next.js chỉ load environment variables khi **server khởi động**. Nếu bạn thêm/sửa `.env.local` mà không restart server, variables sẽ không được load.

---

## ✅ Cách sửa:

### Bước 1: Kiểm tra file `.env.local`

Đảm bảo file `.env.local` ở **root của project** (cùng cấp với `package.json`) và có format đúng:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xfknwfgnccvnnkdtakqf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma253ZmduY2N2bm5rZHRha3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMzI0MDAsImV4cCI6MjA3OTgwODQwMH0._MtRUIjSbMd1sGYZVQoUJC5ssqy6wr9VZvZ6HJpNPHc
```

**Lưu ý quan trọng:**
- ❌ KHÔNG có dấu cách trước/sau dấu `=`
- ❌ KHÔNG có dấu ngoặc kép `"` hoặc `'` quanh giá trị
- ✅ Mỗi biến trên 1 dòng
- ✅ Không có dấu `;` ở cuối

### Bước 2: Restart Dev Server

**QUAN TRỌNG:** Sau khi thêm/sửa `.env.local`, bạn **PHẢI** restart server:

1. **Dừng server hiện tại:**
   - Trong terminal đang chạy `npm run dev`, nhấn `Ctrl + C`

2. **Chạy lại server:**
   ```bash
   npm run dev
   ```

3. **Kiểm tra:**
   - Mở browser → Console (F12)
   - Reload trang `/admin`
   - Nếu thấy "✅ Supabase configured successfully" → OK!
   - Nếu vẫn thấy "❌ Supabase environment variables are missing!" → xem Bước 3

### Bước 3: Kiểm tra bằng API

Mở browser và vào: `http://localhost:3000/api/check-env`

Nếu thấy:
```json
{
  "hasNextPublicUrl": true,
  "hasNextPublicKey": true,
  ...
}
```
→ Env variables đã được load ✅

Nếu thấy:
```json
{
  "hasNextPublicUrl": false,
  "hasNextPublicKey": false,
  ...
}
```
→ Cần kiểm tra lại file `.env.local` và restart server

### Bước 4: Kiểm tra vị trí file

Đảm bảo file `.env.local` ở đúng vị trí:

```
fe/
├── .env.local          ← File này phải ở đây
├── package.json
├── next.config.js
├── app/
└── ...
```

### Bước 5: Clear cache (nếu vẫn lỗi)

Nếu vẫn không được, thử:

```bash
# Xóa cache Next.js
rm -rf .next

# Hoặc trên Windows PowerShell:
Remove-Item -Recurse -Force .next

# Sau đó restart server
npm run dev
```

---

## 🔍 Debug

### Kiểm tra trong Console:

Mở Console (F12) và xem log:
- `=== Supabase Config Check ===`
- Nếu thấy "Missing" → env chưa được load
- Nếu thấy "Set" → env đã được load

### Kiểm tra trong Network tab:

1. Mở DevTools → Network tab
2. Reload trang
3. Tìm request đến `/api/check-env`
4. Xem response để biết env có được load không

---

## ⚠️ Lưu ý

1. **NEXT_PUBLIC_*** variables được expose ra client-side (browser)
2. Variables **KHÔNG có** `NEXT_PUBLIC_` prefix chỉ dùng ở server-side (API routes)
3. Sau khi sửa `.env.local`, **LUÔN** restart server
4. File `.env.local` không được commit lên Git (đã có trong `.gitignore`)

---

## ✅ Sau khi fix xong:

1. Restart server
2. Reload trang `/admin`
3. Console sẽ hiển thị: "✅ Supabase configured successfully"
4. Editor sẽ hoạt động bình thường
5. Upload ảnh sẽ hoạt động

