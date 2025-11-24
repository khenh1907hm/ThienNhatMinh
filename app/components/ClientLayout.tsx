'use client';

import { I18nProvider } from '../i18n/context';
import Navigation from './Navigation';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </I18nProvider>
  );
}


