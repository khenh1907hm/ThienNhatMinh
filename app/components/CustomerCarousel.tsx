'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useI18n } from '../i18n/context';

interface CustomerCarouselProps {
  customers: string[];
}

export default function CustomerCarousel({ customers }: CustomerCarouselProps) {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(window.innerWidth >= 768 ? 3 : 1);
    };
    
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const maxIndex = Math.max(0, customers.length - itemsPerView);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) return 0;
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, customers.length, itemsPerView]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    const maxIndex = Math.max(0, customers.length - itemsPerView);
    setCurrentIndex((prev) => (prev - 1 + maxIndex + 1) % (maxIndex + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    const maxIndex = Math.max(0, customers.length - itemsPerView);
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  
  return (
    <div className="relative w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#0A3D62] mb-12 text-center">
          {t.home.customersTitle}
        </h2>
        
        <div className="relative overflow-hidden">
          {/* Slides */}
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}>
            {customers.map((customer, index) => (
              <div key={index} className={`min-w-full md:min-w-[33.333%] flex items-center justify-center px-4`}>
                <div className="relative w-full h-32 md:h-40 flex items-center justify-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <Image
                    src={customer}
                    alt={`Customer ${index + 1}`}
                    width={200}
                    height={80}
                    className="object-contain max-h-32 md:max-h-40 transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-all duration-200 z-10"
            aria-label="Previous customer"
          >
            <svg
              className="w-6 h-6 text-[#0A3D62]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-all duration-200 z-10"
            aria-label="Next customer"
          >
            <svg
              className="w-6 h-6 text-[#0A3D62]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Indicators */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {customers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-[#0A3D62]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to customer ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

