'use client';

import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

interface ProjectCardProps {
  title: string;
  image: string;
  delay?: number;
}

export default function ProjectCard({ title, image, delay = 0 }: ProjectCardProps) {
  return (
    <ScrollAnimation direction="up" delay={delay}>
      <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
        <div className="aspect-video relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-lg">{title}</h3>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
}

