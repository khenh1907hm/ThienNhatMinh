'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useI18n } from '../i18n/context';
import ScrollAnimation from '../components/ScrollAnimation';

export default function ProjectsPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('featured');

  // Dự án tiêu biểu
  const featuredProjects = [
    { name: 'MEG MILK SNOW BRAND VN' },
    { name: 'Mabuchi Biên Hòa Solar 1MWp phase 1' },
    { name: 'FT Pharma – GMP-EU Long Hau Pharmaceutical Factory' },
    { name: 'KINGSPAN VIỆT NAM SOLAR 1MW' },
    { name: 'ACCREDO ASIA SOLAR – 1MW' },
    { name: 'SHOWA SANGYO INTERNATIONAL VIỆT NAM' },
    { name: 'NHÀ MÁY MỚI ACECOOK VĨNH LONG' },
    { name: 'ACCREDO ASIA SOLAR – 1MW (PHASE 3)' },
    { name: 'MURATA MANUFACTURING VN – HCM S&B' },
    { name: 'OTSUKA THANG NUTRITION CO., LTD – POCARI PHASE 2' },
    { name: 'Lotte My Phuoc Factory Renovation' },
    { name: 'Yuwa Vietnam Renovation Project' },
    { name: 'Mabuchi Danang Solar 1MWp phase 2' },
    { name: 'Murata Manufacturing Vietnam Co., Ltd' },
    { name: 'NHÀ MÁY YAZAKI CỦ CHI' },
    { name: 'KANEKA VIỆT NAM PHASE 3' },
    { name: 'NHÀ MÁY NIPRO VIỆT NAM' },
    { name: 'METRO STATION' },
    { name: 'Suzuki' },
    { name: 'Siêu thị Aeon Bình Dương' },
    { name: 'Siêu thị Aeon Bình Tân' },
    { name: 'Nanoco Building' },
    { name: 'Estella Height' },
    { name: 'Sapporo Việt Nam' },
    { name: 'Nissin Food' },
    { name: 'Rohto Việt Nam' },
    { name: 'Otsuka Techno' },
    { name: 'Wonderful Sài Gòn' },
    { name: 'Sài gòn Stec' },
  ];

  // Dự án đang thực hiện
  const inProgressProjects = [
    { name: 'TAKIGAWA CORPORATION VIETNAM NEW FACTORY' },
    { name: 'MEG MILK SNOW BRAND VN' },
    { name: 'OTSUKA THANG NUTRITION CO., LTD – POCARI PHASE 2' },
    { name: 'MURATA MANUFACTURING VN – HCM S&B' },
    { name: 'ACCREDO ASIA SOLAR – 1MW (PHASE 3)' },
    { name: 'NHÀ MÁY MỚI ACECOOK VĨNH LONG' },
    { name: 'SHOWA SANGYO INTERNATIONAL VIỆT NAM' },
  ];

  // Dự án đã thực hiện
  const completedProjects = [
    { name: 'Murata Manufacturing Vietnam – Solar 438kW' },
    { name: 'MABUCHI DANANG RENOVATION' },
    { name: 'ACCREDO ASIA SOLAR – 1MW' },
    { name: 'KYOKUYO VINA FOODS COMPANY LIMITED – LONG AN BRANCH' },
    { name: 'MUFG NEW OFFICE' },
    { name: 'PANASONIC LIFE SOLUTION VIETNAM CO., LTD – PHASE 3 FACTORY' },
    { name: 'KINGSPAN VIỆT NAM SOLAR 1MW' },
    { name: 'SMC VIETNAM CO., LTD – SMC NEW 3RD FACTORY – PHASE 2' },
    { name: 'SMC VIETNAM CO., LTD – SMC NEW 1ST FACTORY – PHASE 3' },
    { name: 'SMC VIETNAM CO., LTD – SMC NEW 2ND FACTORY – PHASE 3' },
    { name: 'Mabuchi Biên Hòa Solar 1MWp phase 1' },
    { name: 'FT Pharma – GMP-EU Long Hau Pharmaceutical Factory' },
    { name: 'Lotte My Phuoc Factory Renovation' },
    { name: 'Yuwa Vietnam Renovation Project' },
    { name: 'Mabuchi Danang Solar 1MWp phase 2' },
    { name: 'Murata Manufacturing Vietnam Co., Ltd' },
    { name: 'NHÀ MÁY YAZAKI CỦ CHI' },
    { name: 'NHÀ MÁY PLUS VIỆT NAM' },
    { name: 'CMC Creative Space' },
    { name: 'ELANCO VIỆT NAM' },
    { name: 'KANEKA VIỆT NAM PHASE 3' },
    { name: 'NHÀ MÁY NIPRO VIỆT NAM' },
    { name: 'METRO STATION' },
  ];

  const getProjectsByTab = () => {
    switch (activeTab) {
      case 'featured':
        return featuredProjects;
      case 'inProgress':
        return inProgressProjects;
      case 'completed':
        return completedProjects;
      default:
        return featuredProjects;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Tabs Section */}
      <section className="py-6 md:py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 ${
                activeTab === 'featured'
                  ? 'bg-[#0A3D62] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Dự án tiêu biểu
            </button>
            <button
              onClick={() => setActiveTab('inProgress')}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 ${
                activeTab === 'inProgress'
                  ? 'bg-[#0A3D62] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Dự án đang thực hiện
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 ${
                activeTab === 'completed'
                  ? 'bg-[#0A3D62] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Dự án đã thực hiện
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {getProjectsByTab().length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {getProjectsByTab().map((project, index) => (
                <ScrollAnimation key={index} direction="up" delay={index * 50}>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-[#0A3D62] flex flex-col">
                    <div className="relative w-full h-32 mb-4">
                      <Image
                        src="/images/bannner-1.jpg"
                        alt={project.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="px-4 pb-4 text-center">
                      <h3 className="text-base font-semibold text-[#0A3D62]">
                        {project.name}
                      </h3>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                {activeTab === 'featured' && 'Chưa có dự án tiêu biểu'}
                {activeTab === 'inProgress' && 'Chưa có dự án đang thực hiện'}
                {activeTab === 'completed' && 'Chưa có dự án đã thực hiện'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#0A3D62] to-[#082A47] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: t.projects.projectsCompleted },
              { number: '200+', label: t.projects.satisfiedClients },
              { number: '98%', label: t.projects.successRate },
              { number: '15+', label: t.projects.yearsExperience },
            ].map((stat, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <div>
                  <div className="text-5xl font-bold mb-2">{stat.number}</div>
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
