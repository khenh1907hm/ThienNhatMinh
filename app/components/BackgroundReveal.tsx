'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface BackgroundRevealProps {
  children: ReactNode;
  backgroundImage: string;
  overlayColor?: string;
  overlayOpacity?: number;
  className?: string;
}

export default function BackgroundReveal({
  children,
  backgroundImage,
  overlayColor = 'white',
  overlayOpacity = 0.8,
  className = '',
}: BackgroundRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const overlayStyle = overlayColor === 'white' 
    ? `bg-white/${Math.round(overlayOpacity * 100)}`
    : `bg-[${overlayColor}]/${Math.round(overlayOpacity * 100)}`;

  return (
    <section
      ref={ref}
      className={`py-20 relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay - chỉ overlay thay đổi khi scroll đến */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundColor: overlayColor === 'white' 
            ? `rgba(255, 255, 255, ${overlayOpacity})`
            : overlayColor.startsWith('#')
            ? (() => {
                const hex = overlayColor.replace('#', '');
                const r = parseInt(hex.substring(0, 2), 16);
                const g = parseInt(hex.substring(2, 4), 16);
                const b = parseInt(hex.substring(4, 6), 16);
                return `rgba(${r}, ${g}, ${b}, ${overlayOpacity})`;
              })()
            : `rgba(${overlayColor}, ${overlayOpacity})`,
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}

