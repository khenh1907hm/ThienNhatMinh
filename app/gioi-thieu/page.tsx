'use client';

import { useI18n } from '../i18n/context';
import ScrollAnimation from '../components/ScrollAnimation';
import OrganizationChart from '../components/OrganizationChart';

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen">
      {/* Introduction Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <ScrollAnimation direction="up" delay={0}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-6 md:mb-8 text-center">
                {t.about.aboutUs}
              </h2>
              <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                {t.about.aboutUsText1}
              </p>
              
              <div className="space-y-4 mb-6">
                <p className="text-lg text-gray-700 font-semibold">
                  • {t.about.aboutUsText2}
                </p>
                <p className="text-lg text-gray-700 font-semibold">
                  • {t.about.aboutUsText3}
                </p>
                <p className="text-lg text-gray-700 font-semibold">
                  • {t.about.aboutUsText4}
                </p>
                <p className="text-lg text-gray-700 font-semibold">
                  • {t.about.aboutUsText5}
                </p>
              </div>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t.about.aboutUsText6}
              </p>

              <ul className="list-disc list-inside space-y-2 mb-6 text-lg text-gray-700 ml-4">
                {t.about.projectsList.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t.about.aboutUsText7}
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t.about.aboutUsText8}
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t.about.aboutUsText9}
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="py-20 bg-gradient-to-br from-[#E1E2E5] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={0}>
            <h2 className="text-4xl font-bold text-[#0A3D62] mb-12 text-center">
              {t.about.visionMission}
            </h2>
          </ScrollAnimation>

          <div className="space-y-12">
            <ScrollAnimation direction="up" delay={200}>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-3xl font-bold text-red-600 mb-6">
                  {t.about.vision}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t.about.visionText}
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={400}>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-3xl font-bold text-red-600 mb-6">
                  {t.about.mission}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  {t.about.missionText1}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t.about.missionText2}
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={0}>
            <h2 className="text-4xl font-bold text-[#0A3D62] mb-6 text-center">
              {t.about.values}
            </h2>
            <p className="text-lg text-gray-700 mb-4 text-center">
              {t.about.valuesIntro}
            </p>
            <p className="text-lg text-gray-700 mb-8 text-center font-semibold">
              {t.about.valuesSubtitle}
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollAnimation direction="up" delay={200}>
              <div className="p-6 bg-gradient-to-br from-[#E1E2E5] to-white rounded-xl border-2 border-[#0A3D62] hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-[#0A3D62] mb-3">
                  {t.about.integrity}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t.about.integrityText}
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={300}>
              <div className="p-6 bg-gradient-to-br from-[#E1E2E5] to-white rounded-xl border-2 border-[#0A3D62] hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-[#0A3D62] mb-3">
                  {t.about.quality}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t.about.qualityText}
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={400}>
              <div className="p-6 bg-gradient-to-br from-[#E1E2E5] to-white rounded-xl border-2 border-[#0A3D62] hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-[#0A3D62] mb-3">
                  {t.about.safety}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t.about.safetyText}
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={500}>
              <div className="p-6 bg-gradient-to-br from-[#E1E2E5] to-white rounded-xl border-2 border-[#0A3D62] hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-[#0A3D62] mb-3">
                  {t.about.customerFocus}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t.about.customerFocusText}
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Organization Chart Section - Hidden on mobile and tablet */}
      <section className="hidden lg:block py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={0}>
            <h2 className="text-4xl font-bold text-[#0A3D62] mb-12 text-center">
              {t.about.organizationChart}
            </h2>
          </ScrollAnimation>
          <ScrollAnimation direction="fade" delay={200}>
            <OrganizationChart className="mt-8" />
          </ScrollAnimation>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#0A3D62] to-[#082A47] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: t.about.projectsCompleted },
              { number: '200+', label: t.about.clients },
              { number: '20+', label: t.about.yearsExperience },
              { number: '50+', label: t.about.employees },
            ].map((stat, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-200">{stat.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
