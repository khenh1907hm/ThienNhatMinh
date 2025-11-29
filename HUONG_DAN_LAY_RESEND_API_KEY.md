# 📧 Hướng dẫn Lấy Resend API Key - Chi tiết từng bước

## 🎯 Mục đích
Resend API Key cần để gửi email từ form liên hệ về Gmail của bạn (`hminh19072003@gmail.com`).

---

## 📋 Bước 1: Đăng ký/Đăng nhập Resend

1. **Mở trình duyệt** và vào: https://resend.com
2. **Click "Sign Up"** (nếu chưa có tài khoản) hoặc **"Sign In"** (nếu đã có)
3. Đăng nhập bằng:
   - **Google** (khuyến nghị - nhanh nhất)
   - **Email** (tạo tài khoản mới)

---

## 🔑 Bước 2: Lấy API Key

### 2.1. Vào trang API Keys

Sau khi đăng nhập, bạn sẽ thấy Dashboard. Làm theo các bước:

1. **Click vào menu bên trái** → Tìm **"API Keys"** 
   - Hoặc vào trực tiếp: https://resend.com/api-keys

2. **Bạn sẽ thấy trang quản lý API Keys**

### 2.2. Tạo API Key mới

1. **Click nút "Create API Key"** (màu xanh, ở góc trên bên phải)

2. **Điền thông tin:**
   - **Name**: Đặt tên dễ nhớ, ví dụ: `Website Contact Form`
   - **Permission**: Chọn **"Sending access"** (đủ để gửi email)

3. **Click "Add"** hoặc **"Create"**

4. **⚠️ QUAN TRỌNG: Copy API Key ngay lập tức!**
   - API Key sẽ hiện ra **CHỈ MỘT LẦN DUY NHẤT**
   - Format: `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Copy toàn bộ key** (bắt đầu bằng `re_`)

---

## 📝 Bước 3: Thêm vào `.env.local`

1. **Mở file `.env.local`** trong thư mục root của project

2. **Tìm dòng `RESEND_API_KEY`** (hoặc thêm mới nếu chưa có):

```env
# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=hminh19072003@gmail.com

# Lưu ý: RESEND_FROM_EMAIL không cần set
# Code sẽ tự động dùng onboarding@resend.dev (email mặc định, không cần verify domain)
```

3. **Paste API Key** vào sau dấu `=`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   (Thay `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` bằng key bạn vừa copy)

4. **Lưu file** (Ctrl+S)

---

## 🔄 Bước 4: Restart Dev Server

**QUAN TRỌNG:** Sau khi thêm/sửa `.env.local`, **PHẢI restart server**:

1. **Dừng server hiện tại:**
   - Trong terminal, nhấn `Ctrl + C`

2. **Chạy lại server:**
   ```bash
   npm run dev
   ```

3. **Đợi server khởi động** (sẽ thấy "Ready" trong terminal)

---

## ✅ Bước 5: Kiểm tra

1. **Mở trang liên hệ:** http://localhost:3000/lien-he
2. **Điền form và submit**
3. **Kiểm tra:**
   - Form hiện thông báo "Cảm ơn bạn đã liên hệ!"
   - Email được gửi về `hminh19072003@gmail.com`
   - Kiểm tra cả **Spam/Junk folder** nếu không thấy

---

## 🐛 Troubleshooting

### Lỗi: "Email service chưa được cấu hình"
- ✅ Kiểm tra `RESEND_API_KEY` đã thêm vào `.env.local` chưa
- ✅ Kiểm tra key có đúng format `re_...` không
- ✅ **Restart dev server** sau khi thêm key

### Lỗi: "Invalid API key"
- ✅ Copy lại key từ Resend dashboard
- ✅ Đảm bảo không có khoảng trắng thừa
- ✅ Kiểm tra key chưa bị revoke (xóa) trong Resend dashboard

### Email không đến
- ✅ Kiểm tra **Spam/Junk folder** trong Gmail
- ✅ Kiểm tra Resend dashboard → **Logs** để xem email có được gửi không
- ✅ Kiểm tra `CONTACT_EMAIL` đúng chưa: `hminh19072003@gmail.com`

### API Key bị mất
- ✅ Vào Resend dashboard → **API Keys**
- ✅ Tạo key mới và thay thế trong `.env.local`
- ✅ Restart server

---

## 📊 Resend Free Tier

**Resend miễn phí:**
- ✅ **3,000 emails/tháng** (đủ cho ~100 emails/ngày)
- ✅ Không cần thẻ tín dụng
- ✅ Email domain mặc định: `onboarding@resend.dev` (không cần verify domain)
- ⚠️ **Lưu ý:** Nếu muốn dùng email custom (ví dụ: `noreply@yourdomain.com`), cần verify domain trong Resend dashboard

**Nếu cần nhiều hơn:**
- Upgrade lên Pro: $20/tháng → 50,000 emails
- Hoặc verify domain để dùng email custom

---

## 🎉 Hoàn thành!

Nếu form liên hệ gửi email thành công, bạn đã setup xong!

**Next steps:**
- Test form ở footer
- Test form ở trang `/lien-he`
- Kiểm tra email trong Gmail

---

## 📸 Screenshots (Tham khảo)

### Trang API Keys trong Resend:
```
Dashboard → API Keys (sidebar trái)
→ Click "Create API Key"
→ Điền Name → Click "Add"
→ Copy key (chỉ hiện 1 lần!)
```

### File .env.local:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=hminh19072003@gmail.com
```

**Lưu ý:** 
- `RESEND_FROM_EMAIL` không cần set trong `.env.local`
- Code sẽ tự động dùng `onboarding@resend.dev` (email mặc định của Resend)
- Email này không cần verify domain, hoạt động ngay sau khi có API key

---

**Lưu ý:** 
- API Key là **bí mật**, không share công khai
- File `.env.local` đã có trong `.gitignore` nên không bị commit lên Git
- Khi deploy lên Vercel, cần thêm `RESEND_API_KEY` vào Environment Variables

