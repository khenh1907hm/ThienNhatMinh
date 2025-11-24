'use client';

import Link from 'next/link';
import { useI18n } from '../i18n/context';
import { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';

const Footer = () => {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ sớm nhất có thể.');
    setFormData({ name: '', phone: '', email: '', content: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <footer className="bg-gradient-to-br from-[#0A3D62] to-[#082A47] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Information */}
          <ScrollAnimation direction="up" delay={0}>
            <div>
              <h3 className="text-xl font-bold mb-4">THÔNG TIN LIÊN HỆ</h3>
              <div className="space-y-3 text-sm">
                <p className="font-semibold">CÔNG TY TNHH THIÊN NHẬT MINH</p>
                <p>
                  <span className="font-semibold">Địa chỉ:</span> 75 Nguyễn Cửu Đàm, Phường Tân Sơn Nhì, TP Hồ Chí Minh
                </p>
                <p>
                  <span className="font-semibold">Điện Thoại:</span> 0903 444 444
                </p>
                <p>
                  <span className="font-semibold">Email:</span> ng.luu.ga@thiennhatminh.com
                </p>
                <div className="pt-4 space-y-2 text-xs">
                  <p>
                    <span className="font-semibold">Giấy chứng nhận đăng ký doanh nghiệp số:</span> 0303 500 774
                  </p>
                  <p>
                    <span className="font-semibold">Nơi cấp:</span> Sở Kế hoạch và Đầu tư TP. HCM
                  </p>
                  <p>
                    <span className="font-semibold">Đăng ký ngày:</span> 17/12/2004
                  </p>
                  <p>
                    <span className="font-semibold">Đăng ký thay đổi lần 8:</span> 16/01/2023
                  </p>
                </div>
                <div className="pt-4">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg inline-flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs">ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Consultation Form */}
          <ScrollAnimation direction="up" delay={200}>
            <div>
              <h3 className="text-xl font-bold mb-4">ĐĂNG KÝ TƯ VẤN</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <textarea
                  name="content"
                  placeholder="Nội dung"
                  value={formData.content}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#FFC107] hover:bg-[#FFB300] text-[#0A3D62] font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Đăng ký ngay
                </button>
              </form>
              <Link
                href="#"
                className="text-xs text-white/80 hover:text-white mt-4 inline-block underline"
              >
                Chính sách bảo vệ thông tin cá nhân
              </Link>
            </div>
          </ScrollAnimation>

          {/* Map */}
          <ScrollAnimation direction="up" delay={400}>
            <div>
              <h3 className="text-xl font-bold mb-4">BẢN ĐỒ</h3>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.231239826!2d106.62911931483667!3d10.84183739227075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a3c5e5b5b5b%3A0x5b5b5b5b5b5b5b5b!2zNzUgTmd1eeG7hW4gQ-G7uSDEkOG7i25oLCBQaMaw4buNbmcgVMOibiBTxqFuIE5o4bqldSwgVGjDoG5oIFBow7ogTWluaCwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-end gap-4 mt-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label="Zalo"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </a>
                <a
                  href="tel:0903444444"
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label="Phone"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        <div className="border-t border-white/20 pt-8 mt-8 text-center text-sm">
          <p>&copy; {currentYear} Thiên Nhật Minh. {t.footer.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
