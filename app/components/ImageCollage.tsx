'use client';

import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

interface ImageItem {
  src: string;
  alt: string;
  className?: string;
}

interface ImageCollageProps {
  images: ImageItem[];
  delay?: number;
}

export default function ImageCollage({ images, delay = 0 }: ImageCollageProps) {
  return (
    <div className="relative w-full h-[500px]">
      {images.map((img, index) => (
        <ScrollAnimation
          key={index}
          direction="fade"
          delay={delay + index * 100}
        >
          <div
            className={`absolute rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${img.className || ''}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={300}
              height={300}
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        </ScrollAnimation>
      ))}
    </div>
  );
}

