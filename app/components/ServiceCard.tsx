'use client';

import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

interface ServiceCardProps {
  title: string;
  image: string;
  delay?: number;
}

export default function ServiceCard({ title, image, delay = 0 }: ServiceCardProps) {
  return (
    <ScrollAnimation direction="up" delay={delay}>
      <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <div className="aspect-square relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-4 bg-white">
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#0A3D62] transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </ScrollAnimation>
  );
}

