import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Supabase client (optional - để lưu submissions)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc: name, email, message' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email không hợp lệ' },
        { status: 400 }
      );
    }

    // Lưu vào database (nếu có Supabase)
    if (supabase) {
      try {
        await supabase.from('contact_submissions').insert([
          {
            name,
            email,
            phone: phone || null,
            subject: subject || null,
            message,
          },
        ]);
      } catch (dbError) {
        console.error('Database error (non-critical):', dbError);
        // Continue even if DB fails
      }
    }

    // Gửi email qua Resend
    const recipientEmail = process.env.CONTACT_EMAIL || 'your-email@gmail.com';
    
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Website <onboarding@resend.dev>',
      to: [recipientEmail],
      replyTo: email,
      subject: subject 
        ? `[Liên hệ từ website] ${subject}` 
        : '[Liên hệ từ website] Tin nhắn mới',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A3D62; border-bottom: 2px solid #FFC107; padding-bottom: 10px;">
            Tin nhắn mới từ website
          </h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Họ tên:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Số điện thoại:</strong> ${phone}</p>` : ''}
            ${subject ? `<p><strong>Chủ đề:</strong> ${subject}</p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #0A3D62;">Nội dung tin nhắn:</h3>
            <p style="background: white; padding: 15px; border-left: 4px solid #FFC107; white-space: pre-wrap;">
              ${message}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>Thời gian: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</p>
            <p>Email này được gửi tự động từ form liên hệ trên website.</p>
          </div>
        </div>
      `,
      text: `
Tin nhắn mới từ website

Họ tên: ${name}
Email: ${email}
${phone ? `Số điện thoại: ${phone}` : ''}
${subject ? `Chủ đề: ${subject}` : ''}

Nội dung:
${message}

---
Thời gian: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Không thể gửi email. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

