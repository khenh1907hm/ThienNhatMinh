'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useI18n } from '../i18n/context';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation = () => {
  const { t } = useI18n();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  const getLocalizedPath = (path: string) => {
    // Don't add locale to path, just return the path as-is
    // Locale is stored in cookie, not URL
    return path;
  };

  const handleLinkClick = () => {
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/gioi-thieu', label: t.nav.about },
    { href: '/dich-vu', label: t.nav.services },
    { href: '/du-an', label: t.nav.projects },
    { href: '/tin-tuc', label: t.nav.news },
    { href: '/tuyen-dung', label: t.nav.recruitment },
    { href: '/lien-he', label: t.nav.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'shadow-lg'
          : ''
      }`}
      style={{
        backgroundImage: `url('/images/header backround.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 md:h-24">
          {/* Mobile: Menu Button bên trái */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo - Mobile: ở giữa (flex-1 + justify-center), Desktop: bên trái */}
          <div className="flex-1 flex justify-center items-center md:flex-none md:justify-start">
            <Link href={getLocalizedPath('/')} className="flex items-center justify-center group">
              <div className="flex relative w-24 h-24 sm:w-28 sm:h-28 md:w-24 md:h-24 lg:w-28 lg:h-28 transform group-hover:scale-105 transition-transform">
                <Image
                  src="/images/logo-Thien-Nhat-Minh-Co.-Ltd.-moi-ko-nen-2048x928.png"
                  alt="Thiên Nhật Minh Logo"
                  width={112}
                  height={112}
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={getLocalizedPath(link.href)}
                  onClick={handleLinkClick}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative ${
                    isActive
                      ? 'text-[#0A3D62] font-semibold'
                      : 'text-gray-700 hover:text-[#0A3D62]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A3D62] rounded-full"></span>
                  )}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A3D62] rounded-full scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Utilities */}
          <div className="hidden md:flex items-center">
            <LanguageSwitcher />
          </div>

          {/* Mobile: Language Switcher ở góc phải */}
          <div className="md:hidden flex items-center flex-shrink-0">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1 animate-in slide-in-from-top">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={getLocalizedPath(link.href)}
                  onClick={handleLinkClick}
                  className={`block px-4 py-3 text-base font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-[#0A3D62] font-semibold bg-[#E1E2E5]/50'
                      : 'text-gray-700 hover:text-[#0A3D62] hover:bg-[#E1E2E5]/30'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#0A3D62] rounded-r-full"></span>
                  )}
                </Link>
              );
            })}
            <div className="px-4 py-3">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

