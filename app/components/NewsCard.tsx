'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollAnimation from './ScrollAnimation';

interface NewsCardProps {
  title: string;
  excerpt: string;
  image: string;
  date?: string;
  featured?: boolean;
  delay?: number;
}

export default function NewsCard({
  title,
  excerpt,
  image,
  date,
  featured = false,
  delay = 0,
}: NewsCardProps) {
  if (featured) {
    return (
      <ScrollAnimation direction="right" delay={delay}>
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-auto">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-[#0A3D62] transition-colors">
                {title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
              {date && <p className="text-sm text-gray-500 mb-4">{date}</p>}
              <Link
                href="/tin-tuc"
                className="text-[#0A3D62] font-semibold hover:text-[#082A47] inline-flex items-center"
              >
                Đọc thêm
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </ScrollAnimation>
    );
  }

  return (
    <ScrollAnimation direction="up" delay={delay}>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <div className="relative h-48">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-[#0A3D62] transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{excerpt}</p>
          {date && <p className="text-xs text-gray-500">{date}</p>}
        </div>
      </div>
    </ScrollAnimation>
  );
}

