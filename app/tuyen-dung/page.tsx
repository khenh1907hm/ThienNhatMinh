'use client';

import { useRouter } from 'next/navigation';
import { useI18n } from '../i18n/context';
import ScrollAnimation from '../components/ScrollAnimation';

export default function RecruitmentPage() {
  const { t } = useI18n();
  const router = useRouter();

  const positions = [
    {
      title: t.recruitment.electricalEngineer,
      department: t.recruitment.technical,
      location: t.recruitment.hanoi,
      type: t.recruitment.fullTime,
      description: 'Tìm kiếm kỹ sư điện có kinh nghiệm trong thiết kế và thi công hệ thống điện.',
      requirements: [
        'Tốt nghiệp đại học chuyên ngành Điện',
        'Kinh nghiệm 2-3 năm',
        'Có khả năng làm việc độc lập và nhóm',
      ],
    },
    {
      title: t.recruitment.transformerEngineer,
      department: t.recruitment.technical,
      location: t.recruitment.hoChiMinh,
      type: t.recruitment.fullTime,
      description: 'Chuyên viên thiết kế và giám sát thi công trạm biến áp.',
      requirements: [
        'Tốt nghiệp đại học chuyên ngành Điện',
        'Kinh nghiệm 3-5 năm',
        'Có chứng chỉ hành nghề',
      ],
    },
    {
      title: t.recruitment.salesStaff,
      department: t.recruitment.business,
      location: t.recruitment.hanoi,
      type: t.recruitment.fullTime,
      description: 'Tìm kiếm nhân viên bán hàng có kinh nghiệm trong lĩnh vực điện năng lượng.',
      requirements: [
        'Tốt nghiệp đại học',
        'Kinh nghiệm bán hàng B2B',
        'Kỹ năng giao tiếp tốt',
      ],
    },
    {
      title: t.recruitment.renewableEnergyEngineer,
      department: t.recruitment.technical,
      location: t.recruitment.daNang,
      type: t.recruitment.fullTime,
      description: 'Chuyên viên thiết kế và lắp đặt hệ thống năng lượng mặt trời.',
      requirements: [
        'Tốt nghiệp đại học chuyên ngành Điện/Năng lượng',
        'Kinh nghiệm 2-3 năm',
        'Hiểu biết về hệ thống điện mặt trời',
      ],
    },
  ];

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
          <div className="space-y-6">
            {positions.map((position, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-2xl font-semibold text-[#0A3D62]">
                          {position.title}
                        </h3>
                        <span className="px-3 py-1 bg-[#E1E2E5] text-[#0A3D62] text-sm font-semibold rounded-full">
                          {position.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                        <span className="flex items-center">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                          {position.department}
                        </span>
                        <span className="flex items-center">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {position.location}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{position.description}</p>
                      <div className="mb-6">
                        <h4 className="font-semibold text-[#0A3D62] mb-2">{t.recruitment.requirements}</h4>
                        <ul className="space-y-1">
                          {position.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start text-gray-600">
                              <svg
                                className="w-5 h-5 text-[#FFC107] mr-2 mt-0.5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="md:ml-8 mt-4 md:mt-0">
                      <button 
                        onClick={() => router.push('/lien-he?subject=recruitment')}
                        className="w-full md:w-auto px-8 py-3 bg-[#0A3D62] text-white rounded-lg font-semibold hover:bg-[#082A47] transform hover:scale-105 transition-all duration-200"
                      >
                        {t.recruitment.applyNow}
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
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
