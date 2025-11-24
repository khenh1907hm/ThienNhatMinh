'use client';

import { useI18n } from '../i18n/context';
import ScrollAnimation from '../components/ScrollAnimation';

export default function ServicesPage() {
  const { t } = useI18n();

  const services = [
    {
      title: t.services.transformerStation,
      description: t.services.transformerStationDesc,
      features: [
        t.services.transformerStationDesc,
        t.services.transformerStationDesc,
        t.services.transformerStationDesc,
        t.services.transformerStationDesc,
      ],
      icon: '⚡',
    },
    {
      title: t.services.electricalSystem,
      description: t.services.electricalSystemDesc,
      features: [
        t.services.electricalSystemDesc,
        t.services.electricalSystemDesc,
        t.services.electricalSystemDesc,
        t.services.electricalSystemDesc,
      ],
      icon: '🔌',
    },
    {
      title: t.services.lightingSystem,
      description: t.services.lightingSystemDesc,
      features: [
        t.services.lightingSystemDesc,
        t.services.lightingSystemDesc,
        t.services.lightingSystemDesc,
        t.services.lightingSystemDesc,
      ],
      icon: '💡',
    },
    {
      title: t.services.technicalConsulting,
      description: t.services.technicalConsultingDesc,
      features: [
        t.services.technicalConsultingDesc,
        t.services.technicalConsultingDesc,
        t.services.technicalConsultingDesc,
        t.services.technicalConsultingDesc,
      ],
      icon: '📋',
    },
    {
      title: t.services.maintenance,
      description: t.services.maintenanceDesc,
      features: [
        t.services.maintenanceDesc,
        t.services.maintenanceDesc,
        t.services.maintenanceDesc,
        t.services.maintenanceDesc,
      ],
      icon: '🔧',
    },
    {
      title: t.services.renewableEnergy,
      description: t.services.renewableEnergyDesc,
      features: [
        t.services.renewableEnergyDesc,
        t.services.renewableEnergyDesc,
        t.services.renewableEnergyDesc,
        t.services.renewableEnergyDesc,
      ],
      icon: '☀️',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <div className="p-8 bg-gradient-to-br from-white to-[#E1E2E5] rounded-xl border border-gray-200 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-semibold text-[#0A3D62] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, idx) => (
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
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full px-6 py-3 bg-[#0A3D62] text-white rounded-lg font-semibold hover:bg-[#082A47] transform hover:scale-105 transition-all duration-200">
                    {t.services.contactConsulting}
                  </button>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-[#E1E2E5] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={0}>
            <h2 className="text-4xl font-bold text-[#0A3D62] mb-12 text-center">
              {t.services.processTitle}
            </h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: t.services.consultation, description: t.services.consultationDesc },
              { step: '02', title: t.services.design, description: t.services.designDesc },
              { step: '03', title: t.services.construction, description: t.services.constructionDesc },
              { step: '04', title: t.services.warranty, description: t.services.warrantyDesc },
            ].map((item, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#0A3D62] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-[#0A3D62] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
