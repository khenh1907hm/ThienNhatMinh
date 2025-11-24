'use client';

import { useState } from 'react';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

interface EcosystemItem {
  title: string;
  subtitle: string;
  image: string;
  category: string;
}

interface EcosystemTabsProps {
  categories: string[];
  items: EcosystemItem[];
}

export default function EcosystemTabs({ categories, items }: EcosystemTabsProps) {
  const [activeTab, setActiveTab] = useState(categories[0]);

  const filteredItems = activeTab === 'Tổng quan' 
    ? items 
    : items.filter((item) => item.category === activeTab);

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation direction="up">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            HỆ SINH THÁI THIÊN NHẬT MINH
          </h2>
        </ScrollAnimation>

        {/* Tabs */}
        <ScrollAnimation direction="up" delay={200}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === category
                    ? 'bg-[#0A3D62] text-white shadow-lg'
                    : 'bg-[#E1E2E5] text-gray-700 hover:bg-[#C8C9CC]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <ScrollAnimation key={index} direction="up" delay={index * 50}>
              <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="aspect-video relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-sm">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation direction="up" delay={filteredItems.length * 50}>
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-[#0A3D62] text-white rounded-lg font-semibold hover:bg-[#082A47] transform hover:scale-105 transition-all duration-200 shadow-lg">
              XEM THÊM
            </button>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}

