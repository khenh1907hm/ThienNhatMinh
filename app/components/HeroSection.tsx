'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '../i18n/context';
import TypingEffect from './TypingEffect';

export default function HeroSection() {
  const { t } = useI18n();

  // Các text sẽ typing - đa ngôn ngữ
  const typingTexts = t.home.heroTypingTexts || [];

  return (
    <div 
      className="relative w-full overflow-hidden h-[calc(100vh-5rem)] md:h-[calc(100vh-6rem)]"
      style={{ 
        minHeight: '600px',
      }}
    >
      {/* Background Image - Sử dụng Next Image để tối ưu và nổi bật hơn */}
      <div className="absolute inset-0 w-full" style={{ zIndex: 0 }}>
        <Image
          src="/images/hero-demo2.jpg"
          alt="Hero Background"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
          style={{
            objectFit: 'cover',
            objectPosition: 'center center',
            filter: 'brightness(1.1) contrast(1.05) saturate(1.1)',
            zIndex: 0,
          }}
          unoptimized={false}
        />
        {/* Overlay nhẹ hơn để ảnh nổi bật hơn - giảm opacity từ 80% xuống 40% */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A3D62]/40 via-[#082A47]/30 to-[#0A3D62]/40" style={{ zIndex: 1 }}></div>
        {/* Thêm một lớp overlay mỏng ở trên để text vẫn dễ đọc nhưng không che mất ảnh */}
        <div className="absolute inset-0 bg-black/5" style={{ zIndex: 1 }}></div>
        {/* Thêm hiệu ứng ánh sáng nhẹ ở góc để tạo độ sâu - dùng radial gradient inline */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%)',
            zIndex: 1,
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 text-center w-full">
          <div className="max-w-6xl mx-auto w-full py-8 sm:py-12">
            {/* Company Name - Fixed */}
            <div className="mb-8 sm:mb-10 px-4 sm:px-6">
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4"
                style={{
                  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                Thiên Nhật Minh
              </h1>
              <div className="w-32 h-1 bg-[#FFC107] mx-auto"></div>
            </div>

            {/* Typing Effect */}
            <div className="mb-8 sm:mb-10 px-4 sm:px-6 lg:px-8">
              <h2 
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 break-words leading-tight"
                style={{
                  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                {t.home.heroTypingPrefix || 'Chuyên về'}{' '}
                <TypingEffect
                  texts={typingTexts}
                  speed={100}
                  deleteSpeed={50}
                  pauseTime={2000}
                  className="text-[#FFC107]"
                />
              </h2>
            </div>

            {/* Subtitle */}
            <p 
              className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-6"
              style={{
                textShadow: '1px 1px 6px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.3)',
              }}
            >
              {t.home.heroDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dich-vu"
                className="px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300 shadow-2xl text-lg"
              >
                {t.home.viewServices}
              </Link>
              <Link
                href="/lien-he"
                className="px-10 py-4 bg-[#FFC107] hover:bg-[#FFB300] text-[#0A3D62] rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl text-lg"
              >
                {t.home.contactNow}
              </Link>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <svg
                className="w-8 h-8 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

