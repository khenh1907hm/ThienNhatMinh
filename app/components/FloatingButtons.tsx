'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const openZalo = () => {
    // Mở Zalo trên mobile hoặc desktop
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = 'zalo://chat?phone=0983449446';
      // Fallback nếu không có app Zalo
      setTimeout(() => {
        window.open('https://zalo.me/0983449446', '_blank');
      }, 500);
    } else {
      window.open('https://zalo.me/0983449446', '_blank');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-3 md:gap-4">
      {/* Zalo Button */}
      <button
        onClick={openZalo}
        className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
        aria-label="Liên hệ Zalo"
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/icon_zalo.webp"
            alt="Zalo"
            fill
            className="object-contain p-2"
          />
        </div>
        <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
          Zalo: 0983 449 446
        </span>
      </button>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 md:w-16 md:h-16 bg-[#0A3D62] text-white rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center justify-center"
          aria-label="Lên đầu trang"
        >
          <svg
            className="w-5 h-5 md:w-8 md:h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default FloatingButtons;

