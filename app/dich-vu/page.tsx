'use client';

import Image from 'next/image';
import { useI18n } from '../i18n/context';
import ScrollAnimation from '../components/ScrollAnimation';

export default function ServicesPage() {
  const { t } = useI18n();

  const services = [
    {
      title: t.services.transformerStation,
      description: t.services.transformerStationDesc,
      image: '/images/Hệ thống trạm biến áp.jpg',
      icon: '⚡',
    },
    {
      title: t.services.electricalSystem,
      description: t.services.electricalSystemDesc,
      image: '/images/Hệ thống điện.jpg',
      icon: '🔌',
    },
    {
      title: t.services.lightingSystem,
      description: t.services.lightingSystemDesc,
      image: '/images/hệ thống chiếu sáng.jpg',
      icon: '💡',
    },
    {
      title: t.services.lowVoltageSystem,
      description: t.services.lowVoltageSystemDesc,
      image: '/images/hệ thống điện nhẹ.jpg',
      icon: '📡',
    },
    {
      title: t.services.fireFightingSystem,
      description: t.services.fireFightingSystemDesc,
      image: '/images/hệ thống chữa cháy.jpg',
      icon: '🚒',
    },
    {
      title: t.services.solarPowerSystem,
      description: t.services.solarPowerSystemDesc,
      image: '/images/hệ thống điện năng lượng mặt trời.jpg',
      icon: '☀️',
    },
    {
      title: t.services.hvacSystem,
      description: t.services.hvacSystemDesc,
      image: '/images/HỆ THỐNG ĐIỀU HÒA KHÔNG KHÍ.jpg',
      icon: '❄️',
    },
    {
      title: t.services.waterSupplyDrainage,
      description: t.services.waterSupplyDrainageDesc,
      image: '/images/HỆ THỐNG CẤP THOÁT NƯỚCHỆ THỐNG CẤP THOÁT NƯỚC.jpg',
      icon: '💧',
    },
    {
      title: t.services.firePreventionSystem,
      description: t.services.firePreventionSystemDesc,
      image: '/images/hệ thống phòng cháy.jpg',
      icon: '🔥',
    },
    {
      title: t.services.auxiliarySupplySystem,
      description: t.services.auxiliarySupplySystemDesc,
      image: '/images/HỆ THỐNG CẤP PHỤ TRỢ.jpg',
      icon: '🔋',
    },
    {
      title: t.services.controlSystem,
      description: t.services.controlSystemDesc,
      image: '/images/HỆ THỐNG ĐIỀU KHIỂN.jpg',
      icon: '🎛️',
    },
    {
      title: t.services.processPipingSystem,
      description: t.services.processPipingSystemDesc,
      image: '/images/HỆ THỐNG ỐNG CÔNG NGHỆ.jpg',
      icon: '🔧',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Services Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {services.map((service, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <div className="bg-gradient-to-br from-white to-[#E1E2E5] rounded-xl border border-gray-200 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="text-3xl md:text-4xl mb-2 md:mb-3">{service.icon}</div>
                    <h3 className="text-lg md:text-xl font-semibold text-[#0A3D62] mb-2 md:mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 md:mb-6 text-sm">{service.description}</p>
                    <button className="w-full px-6 py-3 bg-[#0A3D62] text-white rounded-lg font-semibold hover:bg-[#082A47] transform hover:scale-105 transition-all duration-200">
                      {t.services.contactConsulting}
                    </button>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-[#E1E2E5] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-8 md:mb-12 text-center">
              {t.services.processTitle}
            </h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
