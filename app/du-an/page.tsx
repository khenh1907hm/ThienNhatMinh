'use client';

import { useState } from 'react';
import { useI18n } from '../i18n/context';
import ScrollAnimation from '../components/ScrollAnimation';

export default function ProjectsPage() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState(t.projects.all);

  const projects = [
    {
      title: t.projects.project110kV,
      category: t.projects.transformerStation,
      description: t.projects.project110kVDesc,
      location: t.recruitment.hanoi,
      year: '2024',
    },
    {
      title: t.projects.industrialElectrical,
      category: t.projects.electricalSystem,
      description: t.projects.industrialElectricalDesc,
      location: t.recruitment.hoChiMinh,
      year: '2024',
    },
    {
      title: t.projects.smartLighting,
      category: t.projects.lighting,
      description: t.projects.smartLightingDesc,
      location: t.recruitment.daNang,
      year: '2023',
    },
    {
      title: t.projects.solar5MW,
      category: t.projects.renewableEnergy,
      description: t.projects.solar5MWDesc,
      location: 'Bình Dương',
      year: '2023',
    },
    {
      title: t.projects.electricalUpgrade,
      category: t.projects.electricalSystem,
      description: t.projects.electricalUpgradeDesc,
      location: 'Hải Phòng',
      year: '2023',
    },
    {
      title: t.projects.project220kV,
      category: t.projects.transformerStation,
      description: t.projects.project220kVDesc,
      location: 'Quảng Ninh',
      year: '2022',
    },
  ];

  const categories = [
    t.projects.all,
    t.projects.transformerStation,
    t.projects.electricalSystem,
    t.projects.lighting,
    t.projects.renewableEnergy,
  ];

  const filteredProjects =
    selectedCategory === t.projects.all
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#0A3D62] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 aspect-video cursor-pointer hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#0A3D62] text-white text-sm font-semibold rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold text-xl mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/90 text-sm mb-3">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-white/80 text-xs">
                      <span className="flex items-center">
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {project.location}
                      </span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
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
