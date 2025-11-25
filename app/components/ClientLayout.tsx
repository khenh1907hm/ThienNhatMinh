'use client';

import { I18nProvider } from '../i18n/context';
import Navigation from './Navigation';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
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


