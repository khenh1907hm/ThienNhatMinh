'use client';

import { useI18n } from '../i18n/context';
import ScrollAnimation from '../components/ScrollAnimation';

export default function NewsPage() {
  const { t } = useI18n();

  const news = [
    {
      title: t.news.renewableTrends2024,
      date: '15/01/2024',
      category: t.news.news,
      excerpt: t.news.renewableTrends2024Desc,
      image: '📰',
    },
    {
      title: t.news.smartTransformerTech,
      date: '10/01/2024',
      category: t.news.technology,
      excerpt: t.news.smartTransformerTechDesc,
      image: '⚡',
    },
    {
      title: t.news.ledEnergySaving,
      date: '05/01/2024',
      category: t.news.solutions,
      excerpt: t.news.ledEnergySavingDesc,
      image: '💡',
    },
    {
      title: t.news.industrialElectricalSafety,
      date: '28/12/2023',
      category: t.news.safety,
      excerpt: t.news.industrialElectricalSafetyDesc,
      image: '🛡️',
    },
    {
      title: t.news.largestSolarProject,
      date: '20/12/2023',
      category: t.news.project,
      excerpt: t.news.largestSolarProjectDesc,
      image: '☀️',
    },
    {
      title: t.news.electricalMaintenance,
      date: '15/12/2023',
      category: t.news.service,
      excerpt: t.news.electricalMaintenanceDesc,
      image: '🔧',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Featured News */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ScrollAnimation direction="up" delay={0}>
                <div className="bg-gradient-to-br from-[#E1E2E5] to-white rounded-xl p-8 border border-gray-200">
                  <span className="px-3 py-1 bg-[#0A3D62] text-white text-sm font-semibold rounded-full mb-4 inline-block">
                    {news[0].category}
                  </span>
                  <h2 className="text-3xl font-bold text-[#0A3D62] mb-4">
                    {news[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6">{news[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{news[0].date}</span>
                    <button className="text-[#0A3D62] font-semibold hover:text-[#082A47] inline-flex items-center">
                      {t.news.readMore}
                      <svg
                        className="w-5 h-5 ml-2"
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
                  </div>
                </div>
              </ScrollAnimation>
            </div>
            <div className="space-y-6">
              {news.slice(1, 3).map((item, index) => (
                <ScrollAnimation key={index} direction="up" delay={(index + 1) * 100}>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl flex-shrink-0">{item.image}</div>
                      <div className="flex-1">
                        <span className="text-xs text-[#0A3D62] font-semibold">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-semibold text-[#0A3D62] mt-1 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{item.excerpt}</p>
                        <span className="text-xs text-gray-500">{item.date}</span>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={0}>
            <h2 className="text-3xl font-bold text-[#0A3D62] mb-8">{t.news.allNews}</h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <article className="bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-[#E1E2E5] text-[#0A3D62] text-xs font-semibold rounded-full">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-500">{item.date}</span>
                    </div>
                    <div className="text-4xl mb-4">{item.image}</div>
                    <h3 className="text-xl font-semibold text-[#0A3D62] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{item.excerpt}</p>
                    <button className="text-[#0A3D62] font-semibold hover:text-[#082A47] inline-flex items-center text-sm">
                      {t.news.readMore}
                      <svg
                        className="w-4 h-4 ml-2"
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
                  </div>
                </article>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
