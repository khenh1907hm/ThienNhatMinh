'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollAnimation from './components/ScrollAnimation';
import HeroCarousel from './components/HeroCarousel';
import EcosystemTabs from './components/EcosystemTabs';
import NewsCard from './components/NewsCard';

export default function Home() {

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


  // Ecosystem Data
  const ecosystemCategories = [
    'Tổng quan',
    'Trạm biến áp',
    'Hệ thống điện',
    'Chiếu sáng',
    'Năng lượng tái tạo',
  ];

  const ecosystemItems = [
    {
      title: 'Trạm biến áp 110kV',
      subtitle: 'Khu công nghiệp',
      image: '/images/bannner-1.jpg',
      category: 'Trạm biến áp',
    },
    {
      title: 'Hệ thống điện công nghiệp',
      subtitle: 'Nhà máy sản xuất',
      image: '/images/banner2.png',
      category: 'Hệ thống điện',
    },
    {
      title: 'Chiếu sáng thông minh',
      subtitle: 'Khu đô thị',
      image: '/images/banner3.png',
      category: 'Chiếu sáng',
    },
    {
      title: 'Điện mặt trời 5MW',
      subtitle: 'Bình Dương',
      image: '/images/bannner-1.jpg',
      category: 'Năng lượng tái tạo',
    },
    {
      title: 'Trạm biến áp 220kV',
      subtitle: 'Quảng Ninh',
      image: '/images/banner2.png',
      category: 'Trạm biến áp',
    },
    {
      title: 'Hệ thống điện dân dụng',
      subtitle: 'Chung cư cao cấp',
      image: '/images/banner3.png',
      category: 'Hệ thống điện',
    },
    {
      title: 'LED chiếu sáng',
      subtitle: 'Đường phố',
      image: '/images/bannner-1.jpg',
      category: 'Chiếu sáng',
    },
    {
      title: 'Hệ thống pin năng lượng',
      subtitle: 'Hà Nội',
      image: '/images/banner2.png',
      category: 'Năng lượng tái tạo',
    },
  ];

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

  // Press Releases
  const pressReleases = [
    {
      title: 'Tăng giá trị điện năng lượng Việt trên thị trường thế giới',
      excerpt: 'Thiên Nhật Minh đóng góp vào việc nâng cao giá trị điện năng lượng Việt Nam...',
      image: '/images/bannner-1.jpg',
      date: '20/12/2023',
    },
    {
      title: 'Không thể thiếu nhau trong ngành điện năng lượng',
      excerpt: 'Vai trò quan trọng của Thiên Nhật Minh trong ngành điện năng lượng...',
      image: '/images/banner2.png',
      date: '15/12/2023',
    },
    {
      title: 'Ra mắt giải pháp điện năng lượng mới',
      excerpt: 'Giúp khách hàng trải nghiệm giải pháp điện năng lượng hiện đại...',
      image: '/images/banner3.png',
      date: '10/12/2023',
    },
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
                VỀ THIÊN NHẬT MINH
              </h2>
              <div className="w-24 h-1 bg-[#FFC107] mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Hơn 20 năm kiến tạo và phát triển trong lĩnh vực điện năng lượng
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
                    Lịch sử hình thành
                  </h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Công ty TNHH THIÊN NHẬT MINH được thành lập từ năm 2004 với hơn 20 năm không ngừng kiến tạo và phát triển. Thiên Nhật Minh được biết đến là nhà thầu hàng đầu trong thi công hệ thống cơ điện cho các nhà thầu Nhật Bản.
                  </p>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Với đội ngũ kỹ sư chuyên nghiệp và nhiều công nhân có kinh nghiệm, chúng tôi đã hoàn thành những nhà máy kỹ thuật cao với chất lượng cao và đúng tiến độ.
                  </p>
                  <Link
                    href={getLocalizedPath('/gioi-thieu')}
                    className="inline-flex items-center px-6 py-3 bg-[#0A3D62] text-white rounded-lg font-semibold hover:bg-[#082A47] transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Xem thêm
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
                    title: 'Tầm nhìn',
                    content: 'Trở thành công ty hàng đầu trong lĩnh vực điện năng lượng tại Việt Nam',
                    icon: '👁️',
                    color: 'bg-[#0A3D62]',
                  },
                  {
                    title: 'Sứ mệnh',
                    content: 'Cung cấp giải pháp điện năng lượng chất lượng cao, đảm bảo an toàn và hiệu quả',
                    icon: '🎯',
                    color: 'bg-[#FFC107]',
                  },
                  {
                    title: 'Giá trị cốt lõi',
                    content: 'Chất lượng - An toàn - Chuyên nghiệp - Đổi mới',
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
                  PHÁT TRIỂN BỀN VỮNG
                </h2>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Với phương châm &quot;Chất lượng - An toàn - Hiệu quả&quot;, Thiên Nhật Minh cam kết phát triển bền vững trong lĩnh vực điện năng lượng, tập trung vào các dịch vụ du lịch và hàng tiêu dùng nhanh.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Chúng tôi không ngừng nâng cao chất lượng dịch vụ, đảm bảo an toàn cho mọi dự án và mang lại hiệu quả tối đa cho khách hàng.
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

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              TIN TỨC
            </h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {news.map((item, index) => (
              <NewsCard key={index} {...item} delay={index * 100} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href={getLocalizedPath('/tin-tuc')}
              className="text-[#0A3D62] font-semibold hover:text-[#082A47] inline-flex items-center"
            >
              Xem tất cả tin tức
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Press Release Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              THÔNG CÁO BÁO CHÍ
            </h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {pressReleases.map((item, index) => (
              <NewsCard key={index} {...item} delay={index * 100} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href={getLocalizedPath('/tin-tuc')}
              className="text-[#0A3D62] font-semibold hover:text-[#082A47] inline-flex items-center"
            >
              Xem tất cả thông cáo
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <EcosystemTabs categories={ecosystemCategories} items={ecosystemItems} />

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
                  DỊCH VỤ THIÊN NHẬT MINH
                </h2>
                <h3 className="text-3xl font-semibold text-[#FFC107] mb-8">
                  Giải pháp điện năng lượng
                </h3>
                <ul className="space-y-4 mb-8 text-lg">
                  {[
                    'Hệ thống trạm biến áp',
                    'Hệ thống điện công nghiệp',
                    'Hệ thống chiếu sáng',
                    'Năng lượng tái tạo',
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
                    TRẢI NGHIỆM DỊCH VỤ
                  </Link>
                  <Link
                    href={getLocalizedPath('/lien-he')}
                    className="px-8 py-4 bg-white hover:bg-[#E1E2E5] text-[#0A3D62] rounded-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg text-center"
                  >
                    LIÊN HỆ NGAY
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
