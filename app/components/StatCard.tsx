'use client';

import { ReactNode } from 'react';
import ScrollAnimation from './ScrollAnimation';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: string;
  trendValue?: string;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  icon,
  trend,
  trendValue,
  delay = 0,
}: StatCardProps) {
  return (
    <ScrollAnimation delay={delay} direction="up">
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#082A47] rounded-xl flex items-center justify-center text-white text-xl">
            {icon}
          </div>
          {trend && (
            <div className="flex items-center text-[#FFC107] text-sm font-semibold">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              {trendValue}
            </div>
          )}
        </div>
        <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className="text-xs text-gray-500 mt-2">{trend}</p>
        )}
      </div>
    </ScrollAnimation>
  );
}

