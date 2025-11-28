'use client';

import { I18nProvider } from '../i18n/context';
import Navigation from './Navigation';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    // Layout riêng cho khu vực admin: không dùng header/footer client
    return (
      <I18nProvider>
        <main className="min-h-screen bg-[#F6E8DC]">
          {children}
        </main>
      </I18nProvider>
    );
  }

  return (
    <I18nProvider>
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </I18nProvider>
  );
}


