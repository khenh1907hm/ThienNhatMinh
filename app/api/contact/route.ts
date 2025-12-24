import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit, getClientIP } from '../../lib/rate-limit';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Initialize Supabase client (optional - để lưu submissions)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function POST(request: NextRequest) {
  try {
    console.log('=== Contact Form Submission ===');
    console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Set' : 'Missing');
    console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL || 'Using default: hminh19072003@gmail.com');
    
    const body = await request.json();
    console.log('Request body:', body);
    const { name, email, phone, subject, message, honeypot } = body;

    // 🛡️ Honeypot check - if filled, it's a bot
    if (honeypot && honeypot.trim() !== '') {
      console.warn('🚫 Bot detected via honeypot field');
      // Return success to fool the bot, but don't process
      return NextResponse.json(
        { success: true, message: 'Cảm ơn bạn đã liên hệ!' },
        { status: 200 }
      );
    }

    // 🛡️ Rate limiting by IP
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(`contact:ip:${clientIP}`, {
      maxRequests: 5, // 5 requests
      windowMs: 15 * 60 * 1000, // per 15 minutes
    });

    if (!rateLimitResult.allowed) {
      const resetMinutes = Math.ceil((rateLimitResult.resetTime - Date.now()) / 60000);
      console.warn(`🚫 Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        { 
          error: `Bạn đã gửi quá nhiều tin nhắn. Vui lòng thử lại sau ${resetMinutes} phút.` 
        },
        { status: 429 }
      );
    }

    // 🛡️ Rate limiting by email
    const emailRateLimit = checkRateLimit(`contact:email:${email.toLowerCase()}`, {
      maxRequests: 3, // 3 requests
      windowMs: 60 * 60 * 1000, // per hour
    });

    if (!emailRateLimit.allowed) {
      const resetMinutes = Math.ceil((emailRateLimit.resetTime - Date.now()) / 60000);
      console.warn(`🚫 Rate limit exceeded for email: ${email}`);
      return NextResponse.json(
        { 
          error: `Email này đã gửi quá nhiều tin nhắn. Vui lòng thử lại sau ${resetMinutes} phút.` 
        },
        { status: 429 }
      );
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc: name, email, message' },
        { status: 400 }
      );
    }

    // Validate field lengths (prevent spam)
    if (name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { error: 'Tên phải từ 2 đến 100 ký tự' },
        { status: 400 }
      );
    }

    if (message.trim().length < 10 || message.trim().length > 5000) {
      return NextResponse.json(
        { error: 'Nội dung tin nhắn phải từ 10 đến 5000 ký tự' },
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

    // Check for common spam patterns
    const spamPatterns = [
      /http[s]?:\/\//i, // URLs
      /www\./i,
      /[a-z0-9]+\[?\.\]?[a-z0-9]+/i, // Suspicious domains
    ];

    const isSpam = spamPatterns.some(pattern => {
      return pattern.test(message) && message.length < 50; // Short messages with links are likely spam
    });

    if (isSpam) {
      console.warn('🚫 Potential spam detected');
      return NextResponse.json(
        { error: 'Tin nhắn của bạn có vẻ không hợp lệ. Vui lòng kiểm tra lại.' },
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

    // Kiểm tra Resend API key
    if (!resend) {
      console.error('❌ RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service chưa được cấu hình. Vui lòng liên hệ quản trị viên.' },
        { status: 500 }
      );
    }

    // Gửi email qua Resend
    const recipientEmail = process.env.CONTACT_EMAIL || 'hminh19072003@gmail.com';
    
    // Dùng email mặc định của Resend (không cần verify domain)
    // Nếu muốn dùng email custom, cần verify domain trong Resend dashboard
    const fromEmail = 'onboarding@resend.dev';
    
    console.log('📧 Sending email to:', recipientEmail);
    console.log('📧 From email:', fromEmail);
    
    const { data, error } = await resend.emails.send({
      from: `Website <${fromEmail}>`,
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
      console.error('❌ Resend error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: 'Không thể gửi email. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    console.log('✅ Email sent successfully:', data);
    console.log('📧 Email ID:', data?.id);
    console.log('📧 Recipient:', recipientEmail);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.',
        emailId: data?.id,
        recipient: recipientEmail
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Contact API error:', error);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    
    return NextResponse.json(
      { 
        error: 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    );
  }
}

