'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollAnimation from './components/ScrollAnimation';
import HeroCarousel from './components/HeroCarousel';
import CustomerCarousel from './components/CustomerCarousel';
import { useI18n } from './i18n/context';

export default function Home() {
  const { t } = useI18n();

  const getLocalizedPath = (path: string) => {
    return path;
  };

  // Hero Carousel Slides
  const heroSlides = [
    {
      image: '/images/bannner-1.jpg',
    },
    {
      image: '/images/banner2.png',
    },
    {
      image: '/images/banner3.png',
    },
  ];


  // Projects Data
  const [activeProjectTab, setActiveProjectTab] = useState('featured');

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

  const inProgressProjects = [
    { name: 'TAKIGAWA CORPORATION VIETNAM NEW FACTORY' },
    { name: 'MEG MILK SNOW BRAND VN' },
    { name: 'OTSUKA THANG NUTRITION CO., LTD – POCARI PHASE 2' },
    { name: 'MURATA MANUFACTURING VN – HCM S&B' },
    { name: 'ACCREDO ASIA SOLAR – 1MW (PHASE 3)' },
    { name: 'NHÀ MÁY MỚI ACECOOK VĨNH LONG' },
    { name: 'SHOWA SANGYO INTERNATIONAL VIỆT NAM' },
  ];

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
    switch (activeProjectTab) {
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

  // News Data
  const news = [
    {
      title: 'Xu hướng năng lượng tái tạo năm 2024',
      excerpt: 'Các xu hướng mới trong lĩnh vực năng lượng tái tạo và cách áp dụng vào thực tế...',
      image: '/images/bannner-1.jpg',
      date: '15/01/2024',
    },
    {
      title: 'Công nghệ trạm biến áp thông minh',
      excerpt: 'Giới thiệu về công nghệ trạm biến áp thông minh và lợi ích của nó...',
      image: '/images/banner2.png',
      date: '10/01/2024',
    },
    {
      title: 'Tiết kiệm năng lượng với hệ thống LED',
      excerpt: 'Làm thế nào để tiết kiệm năng lượng với hệ thống chiếu sáng LED...',
      image: '/images/banner3.png',
      date: '05/01/2024',
    },
  ];


  // Customer images
  const customers = [
    '/images/customer_1.svg',
    '/images/customer_2.jpg',
    '/images/customer_3.png',
    '/images/customer_4.png',
    '/images/customer_5.png',
    '/images/customer_6.png',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <HeroCarousel slides={heroSlides} />

      {/* About Section - Redesigned */}
      <section className="py-20 bg-gradient-to-br from-[#E1E2E5] to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230A3D62' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <ScrollAnimation direction="up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-[#0A3D62] mb-4">
                {t.home.aboutSectionTitle}
              </h2>
              <div className="w-24 h-1 bg-[#FFC107] mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                {t.home.aboutSectionDescription}
              </p>
            </div>
          </ScrollAnimation>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { number: '20+', label: 'Năm kinh nghiệm', icon: '📅' },
              { number: '500+', label: 'Dự án hoàn thành', icon: '🏗️' },
              { number: '200+', label: 'Khách hàng', icon: '👥' },
              { number: '50+', label: 'Nhân viên', icon: '💼' },
            ].map((stat, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E1E2E5] text-center">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-4xl font-bold text-[#0A3D62] mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <ScrollAnimation direction="right" delay={400}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-[#FFC107] rounded-2xl opacity-20"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl">
                  <h3 className="text-3xl font-bold text-[#0A3D62] mb-6">
                    {t.home.historyTitle}
                  </h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {t.home.historyText1}
                  </p>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {t.home.historyText2}
                  </p>
                  <Link
                    href={getLocalizedPath('/gioi-thieu')}
                    className="inline-flex items-center px-6 py-3 bg-[#0A3D62] text-white rounded-lg font-semibold hover:bg-[#082A47] transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    {t.home.seeMore}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="left" delay={600}>
              <div className="space-y-6">
                {[
                  {
                    title: t.home.vision,
                    content: t.home.visionContent,
                    icon: '👁️',
                    color: 'bg-[#0A3D62]',
                  },
                  {
                    title: t.home.mission,
                    content: t.home.missionContent,
                    icon: '🎯',
                    color: 'bg-[#FFC107]',
                  },
                  {
                    title: t.home.coreValues,
                    content: t.home.coreValuesContent,
                    icon: '⭐',
                    color: 'bg-[#0A3D62]',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#FFC107]"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-[#0A3D62] mb-2">{item.title}</h4>
                        <p className="text-gray-700">{item.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          </div>

          {/* Image Gallery */}
          <ScrollAnimation direction="up" delay={800}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                '/images/bannner-1.jpg',
                '/images/banner2.png',
                '/images/banner3.png',
                '/images/bannner-1.jpg',
              ].map((src, index) => (
                <div
                  key={index}
                  className="relative h-48 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <Image
                    src={src}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Sustainable Development Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <ScrollAnimation direction="right" delay={0}>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {t.home.sustainableDevelopmentTitle}
                </h2>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  {t.home.sustainableDevelopmentText1}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t.home.sustainableDevelopmentText2}
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="left" delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { src: '/images/bannner-1.jpg', alt: 'Sustainable 1', className: 'rounded-xl' },
                  { src: '/images/banner2.png', alt: 'Sustainable 2', className: 'rounded-xl' },
                  { src: '/images/banner3.png', alt: 'Sustainable 3', className: 'rounded-xl col-span-2' },
                ].map((img, index) => (
                  <div key={index} className="relative h-48 rounded-xl overflow-hidden shadow-lg">
        <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* News Section - New Layout */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t.home.newsTitle}
              </h2>
              <div className="w-24 h-1 bg-[#FFC107] mx-auto"></div>
            </div>
          </ScrollAnimation>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured Article - Left Column */}
            <div className="lg:col-span-2">
              <ScrollAnimation direction="up" delay={0}>
                <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64 md:h-80">
                    <Image
                      src={news[0].image}
                      alt={news[0].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0A3D62] mb-4">
                      {news[0].title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {news[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">{news[0].date}</span>
                      <Link
                        href={getLocalizedPath('/tin-tuc')}
                        className="text-[#0A3D62] font-semibold hover:text-[#082A47] inline-flex items-center"
                      >
                        {t.home.readMore}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollAnimation>
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-6">
              {news.slice(1).map((item, index) => (
                <ScrollAnimation key={index} direction="up" delay={(index + 1) * 100}>
                  <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <h4 className="text-sm md:text-base font-semibold text-[#0A3D62] mb-2 line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                  </article>
                </ScrollAnimation>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href={getLocalizedPath('/tin-tuc')}
              className="text-[#0A3D62] font-semibold hover:text-[#082A47] inline-flex items-center"
            >
              {t.home.viewAllNews}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#0A3D62] mb-4">
                {t.services.title}
              </h2>
              <div className="w-24 h-1 bg-[#FFC107] mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.services.subtitle}
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: t.services.transformerStation,
                description: t.services.transformerStationDesc,
                image: '/images/Hệ thống trạm biến áp.jpg',
              },
              {
                title: t.services.electricalSystem,
                description: t.services.electricalSystemDesc,
                image: '/images/Hệ thống điện.jpg',
              },
              {
                title: t.services.lightingSystem,
                description: t.services.lightingSystemDesc,
                image: '/images/hệ thống chiếu sáng.jpg',
              },
              {
                title: t.services.lowVoltageSystem,
                description: t.services.lowVoltageSystemDesc,
                image: '/images/hệ thống điện nhẹ.jpg',
              },
              {
                title: t.services.fireFightingSystem,
                description: t.services.fireFightingSystemDesc,
                image: '/images/hệ thống chữa cháy.jpg',
              },
              {
                title: t.services.solarPowerSystem,
                description: t.services.solarPowerSystemDesc,
                image: '/images/hệ thống điện năng lượng mặt trời.jpg',
              },
            ].map((service, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 w-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#0A3D62] mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
          <div className="text-center">
            <Link
              href={getLocalizedPath('/dich-vu')}
              className="inline-flex items-center px-8 py-4 bg-[#0A3D62] text-white rounded-lg font-semibold hover:bg-[#082A47] transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {t.home.viewMoreServices}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Carousel */}
      <section className="py-12 bg-white">
        <CustomerCarousel customers={customers} />
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              {t.home.projectsTitle}
            </h2>
          </ScrollAnimation>

          {/* Tabs */}
          <ScrollAnimation direction="up" delay={200}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => setActiveProjectTab('featured')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeProjectTab === 'featured'
                    ? 'bg-[#0A3D62] text-white shadow-lg'
                    : 'bg-[#E1E2E5] text-gray-700 hover:bg-[#C8C9CC]'
                }`}
              >
                {t.home.featuredProjects}
              </button>
              <button
                onClick={() => setActiveProjectTab('inProgress')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeProjectTab === 'inProgress'
                    ? 'bg-[#0A3D62] text-white shadow-lg'
                    : 'bg-[#E1E2E5] text-gray-700 hover:bg-[#C8C9CC]'
                }`}
              >
                {t.home.inProgressProjects}
              </button>
              <button
                onClick={() => setActiveProjectTab('completed')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeProjectTab === 'completed'
                    ? 'bg-[#0A3D62] text-white shadow-lg'
                    : 'bg-[#E1E2E5] text-gray-700 hover:bg-[#C8C9CC]'
                }`}
              >
                {t.home.completedProjects}
              </button>
            </div>
          </ScrollAnimation>

          {/* Projects Grid */}
          {getProjectsByTab().length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {getProjectsByTab().slice(0, 8).map((project, index) => (
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
              <ScrollAnimation direction="up" delay={400}>
                <div className="text-center">
                  <Link
                    href={getLocalizedPath('/du-an')}
                    className="inline-flex items-center px-8 py-4 bg-[#0A3D62] text-white rounded-lg font-semibold hover:bg-[#082A47] transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    {t.home.viewMoreProjects}
                  </Link>
                </div>
              </ScrollAnimation>
            </>
          ) : (
            <div className="text-center py-20 mb-12">
              <p className="text-gray-500 text-lg">
                {activeProjectTab === 'featured' && t.home.noFeaturedProjects}
                {activeProjectTab === 'inProgress' && t.home.noInProgressProjects}
                {activeProjectTab === 'completed' && t.home.noCompletedProjects}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gradient-to-br from-[#0A3D62] via-[#082A47] to-[#0A3D62] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation direction="right" delay={0}>
              <div>
                <h2 className="text-5xl font-bold mb-4">
                  {t.home.servicesSectionTitle}
                </h2>
                <h3 className="text-3xl font-semibold text-[#FFC107] mb-8">
                  {t.home.servicesSectionSubtitle}
                </h3>
                <ul className="space-y-4 mb-8 text-lg">
                  {[
                    t.services.transformerStation,
                    t.services.electricalSystem,
                    t.services.lightingSystem,
                    t.services.lowVoltageSystem,
                    t.services.fireFightingSystem,
                    t.services.solarPowerSystem,
                    t.services.hvacSystem,
                    t.services.waterSupplyDrainage,
                    t.services.firePreventionSystem,
                    t.services.auxiliarySupplySystem,
                    t.services.controlSystem,
                    t.services.processPipingSystem,
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-6 h-6 mr-3 text-[#FFC107] flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={getLocalizedPath('/dich-vu')}
                    className="px-8 py-4 bg-[#FFC107] hover:bg-[#FFB300] text-[#0A3D62] rounded-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg text-center"
                  >
                    {t.home.experienceService}
                  </Link>
                  <Link
                    href={getLocalizedPath('/lien-he')}
                    className="px-8 py-4 bg-white hover:bg-[#E1E2E5] text-[#0A3D62] rounded-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg text-center"
                  >
                    {t.home.contactNow}
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="left" delay={200}>
              <div className="relative h-[500px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { src: '/images/bannner-1.jpg', className: 'w-48 h-48 rounded-xl shadow-2xl' },
                      { src: '/images/banner2.png', className: 'w-40 h-40 rounded-xl shadow-2xl mt-8' },
                      { src: '/images/banner3.png', className: 'w-40 h-40 rounded-xl shadow-2xl' },
                      { src: '/images/bannner-1.jpg', className: 'w-48 h-48 rounded-xl shadow-2xl mt-8' },
                    ].map((img, index) => (
                      <div key={index} className={`relative ${img.className} overflow-hidden`}>
            <Image
                          src={img.src}
                          alt={`Product ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  );
}
