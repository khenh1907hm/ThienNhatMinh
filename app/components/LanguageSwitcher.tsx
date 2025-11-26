'use client';

import { useState } from 'react';
import { useI18n } from '../i18n/context';
import { Locale, locales } from '../i18n/translations';

const languageNames: Record<Locale, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
  ja: '日本語',
};

const languageFlags: Record<Locale, string> = {
  vi: '🇻🇳',
  en: 'EN',
  ja: '🇯🇵',
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const getLocaleButtonClasses = (loc: Locale) => {
    switch (loc) {
      case 'vi':
        return 'bg-red-600 text-white hover:bg-red-700';
      case 'ja':
        return 'bg-sky-500 text-white hover:bg-sky-600';
      case 'en':
      default:
        return 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-300';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${getLocaleButtonClasses(
          locale
        )}`}
        aria-label="Change language"
      >
        <span className="text-lg">{languageFlags[locale]}</span>
        <span className="hidden sm:inline">{languageNames[locale]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          } ${locale === 'en' ? 'text-gray-600' : 'text-white'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => {
                  setLocale(loc);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors rounded-md mb-1 last:mb-0 ${getLocaleButtonClasses(
                  loc
                )} ${locale === loc ? 'ring-2 ring-offset-1 ring-[#0A3D62]' : ''}`}
              >
                <span className="text-lg">{languageFlags[loc]}</span>
                <span className="text-sm font-medium">{languageNames[loc]}</span>
                {locale === loc && (
                  <svg
                    className={`w-4 h-4 ml-auto ${
                      loc === 'en' ? 'text-[#0A3D62]' : 'text-white'
                    }`}
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
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

