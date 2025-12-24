'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '../i18n/context';
import ScrollAnimation from '../components/ScrollAnimation';

interface Position {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  created_at: string;
}

export default function RecruitmentPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/posts?category=${encodeURIComponent('Tuyển dụng')}&published=true`);
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || 'Không thể tải danh sách tuyển dụng');
        }

        setPositions(data.posts || []);
      } catch (err) {
        console.error('Error fetching recruitment:', err);
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải tuyển dụng');
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);


  return (
    <div className="min-h-screen">
      {/* Why Join Us */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-8 md:mb-12 text-center">
              {t.recruitment.whyChooseUs}
            </h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: t.recruitment.workEnvironment,
                description: t.recruitment.workEnvironmentDesc,
                icon: '🏢',
              },
              {
                title: t.recruitment.careerDevelopment,
                description: t.recruitment.careerDevelopmentDesc,
                icon: '📈',
              },
              {
                title: t.recruitment.goodBenefits,
                description: t.recruitment.goodBenefitsDesc,
                icon: '💰',
              },
            ].map((item, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <div className="text-center p-8 bg-gradient-to-br from-[#E1E2E5] to-white rounded-xl border border-gray-200">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-[#0A3D62] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gradient-to-br from-[#E1E2E5] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={0}>
            <h2 className="text-4xl font-bold text-[#0A3D62] mb-12 text-center">
              {t.recruitment.openPositions}
            </h2>
          </ScrollAnimation>
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Đang tải danh sách tuyển dụng...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : positions.length > 0 ? (
            <div className="space-y-6">
              {positions.map((position, index) => (
                <PositionCard
                  key={position.id}
                  position={position}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Hiện tại chưa có vị trí tuyển dụng nào.</p>
            </div>
          )}
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={0}>
            <h2 className="text-4xl font-bold text-[#0A3D62] mb-8 text-center">
              {t.recruitment.howToApply}
            </h2>
          </ScrollAnimation>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: t.recruitment.sendResume,
                description: t.recruitment.sendResumeDesc,
              },
              {
                step: '2',
                title: t.recruitment.screening,
                description: t.recruitment.screeningDesc,
              },
              {
                step: '3',
                title: t.recruitment.interview,
                description: t.recruitment.interviewDesc,
              },
              {
                step: '4',
                title: t.recruitment.getHired,
                description: t.recruitment.getHiredDesc,
              },
            ].map((item, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#0A3D62] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#0A3D62] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// Position Card Component - chỉ hiển thị thông tin chung
function PositionCard({ 
  position, 
  index
}: { 
  position: Position; 
  index: number;
}) {
  const { t } = useI18n();
  const router = useRouter();

  return (
    <ScrollAnimation direction="up" delay={index * 100}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
           onClick={() => router.push(`/tuyen-dung/${position.slug}`)}>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <h3 className="text-2xl font-semibold text-[#0A3D62]">
                {position.title}
              </h3>
              <span className="px-3 py-1 bg-[#E1E2E5] text-[#0A3D62] text-sm font-semibold rounded-full">
                {t.recruitment.fullTime}
              </span>
            </div>
            {position.excerpt && (
              <p className="text-gray-600 mb-4 line-clamp-2">{position.excerpt}</p>
            )}
            <div className="flex items-center text-sm text-gray-500">
              <span>Ngày đăng: {new Date(position.created_at).toLocaleDateString('vi-VN')}</span>
            </div>
          </div>
          <div className="md:ml-8 mt-2 md:mt-0 flex-shrink-0">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/tuyen-dung/${position.slug}`);
              }}
              className="w-full md:w-auto px-8 py-3 bg-[#0A3D62] text-white rounded-lg font-semibold hover:bg-[#082A47] transform hover:scale-105 transition-all duration-200"
            >
              Xem chi tiết →
            </button>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
}
