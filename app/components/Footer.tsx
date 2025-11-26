'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';
import { useI18n } from '../i18n/context';

const Footer = () => {
  const { t } = useI18n();
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
    alert(t.footer.thankYouMessage);
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
              <h3 className="text-xl font-bold mb-4">{t.footer.contactInfo}</h3>
              <div className="space-y-3 text-sm">
                <p className="font-semibold">{t.contact.companyName}</p>
                <p>
                  <span className="font-semibold">{t.contact.address}:</span> {t.contact.addressValue}
                </p>
                <p>
                  <span className="font-semibold">{t.contact.phone}:</span> {t.contact.phoneValue}
                </p>
                <p>
                  <span className="font-semibold">{t.contact.email}:</span> {t.contact.emailValue}
                </p>
                <div className="pt-4 space-y-2 text-xs">
                  <p>
                    <span className="font-semibold">{t.contact.businessLicense}:</span> {t.contact.businessLicenseValue}
                  </p>
                  <p>
                    <span className="font-semibold">{t.contact.issuedBy}:</span> {t.contact.issuedByValue}
                  </p>
                  <p>
                    <span className="font-semibold">{t.contact.firstRegistration}:</span> {t.contact.firstRegistrationValue}
                  </p>
                  <p>
                    <span className="font-semibold">{t.contact.changeRegistration}:</span> {t.contact.changeRegistrationValue}
                  </p>
                </div>
                <div className="pt-4">
                  <div className="inline-flex items-center">
                    <Image
                      src="/images/logo xác thực.png"
                      alt="Logo xác thực - Đã thông báo Bộ Công Thương"
                      width={200}
                      height={80}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Consultation Form */}
          <ScrollAnimation direction="up" delay={200}>
            <div>
              <h3 className="text-xl font-bold mb-4">{t.footer.registerConsultation}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder={t.footer.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={t.footer.phonePlaceholder}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t.footer.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <textarea
                  name="content"
                  placeholder={t.footer.contentPlaceholder}
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
                  {t.footer.registerNow}
                </button>
              </form>
              <Link
                href="#"
                className="text-xs text-white/80 hover:text-white mt-4 inline-block underline"
              >
                {t.footer.privacyPolicy}
              </Link>
            </div>
          </ScrollAnimation>

          {/* Map */}
          <ScrollAnimation direction="up" delay={400}>
            <div>
              <h3 className="text-xl font-bold mb-4">{t.footer.map}</h3>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.4568057418655!2d106.62700961012753!3d10.799335358727287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529561b0e8f63%3A0xf7635c9839753ab5!2zNzUgTmd1eeG7hW4gQ-G7rXUgxJDDoG0sIFTDom4gU8ahbiBOaMOsLCBUw6JuIFBow7osIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCA3MDAwMCwgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2s!4v1764127880192!5m2!1svi!2s"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Công ty TNHH Thiên Nhật Minh - 75 Nguyễn Cửu Đàm, Phường Tân Sơn Nhì, TP. Hồ Chí Minh"
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
                  href="tel:0983449446"
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

       
      </div>
    </footer>
  );
};

export default Footer;
