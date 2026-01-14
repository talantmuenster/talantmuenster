'use client';

import { useState, useTransition } from 'react';
import { Locale, locales } from '../../i18n/config';
import { useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';

type LanguageSwitcherProps = {
  variant?: 'desk' | 'mob';
};

export default function LanguageSwitcher({
  variant = 'desk',
}: LanguageSwitcherProps) {
    const t = useTranslations('header');
  const [open, setOpen] = useState(false);        // desktop dropdown
  const [mobileOpen, setMobileOpen] = useState(false); // mobile select
  const [isPending, startTransition] = useTransition();
  const LANGS = [
  { code: 'ru', label: 'Русский' },
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
];
  const getCurrentLocale = (): Locale => {
    if (typeof document === 'undefined') return 'ru';
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('NEXT_LOCALE='));
    return (cookie?.split('=')[1] as Locale) || 'ru';
  };

  const currentLocale = getCurrentLocale();

  const changeLanguage = (locale: Locale) => {
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
      window.location.reload();
    });
  };

  /* =========================
     DESKTOP VARIANT
  ========================== */
  if (variant === 'desk') {
    return (
      <div className="relative">
        {/* CIRCLE */}
        <button
          onClick={() => setOpen(prev => !prev)}
          className="
            w-10 h-10 rounded-full border-2 border-blue-500
            flex items-center justify-center
            text-sm font-semibold text-blue-600
            hover:bg-blue-50 transition
          "
          aria-label="Change language"
        >
          {currentLocale.toUpperCase()}
        </button>

        {/* DROPDOWN */}
        {open && (
          <div
            className="
              absolute right-0 mt-2 w-14 rounded-xl
              bg-white border border-gray-200
              shadow-lg overflow-hidden z-50
            "
          >
            {locales.map(locale => (
              <button
                key={locale}
                onClick={() => {
                  setOpen(false);
                  changeLanguage(locale);
                }}
                disabled={locale === currentLocale || isPending}
                className={`
                  w-full py-2 text-sm font-medium transition
                  ${
                    locale === currentLocale
                      ? 'bg-blue-600 text-white cursor-default'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* =========================
     MOBILE VARIANT
  ========================== */
  return (
    <div className="w-full">
      <span className="block text-lgg text-black mb-3">
        {t('langchange')}
      </span>

      {/* SELECT */}
      <button
        onClick={() => setMobileOpen(prev => !prev)}
        className="
          w-full flex items-center justify-between
          px-4 py-3 rounded-m   border
          border-secondary text-left
        "
      >
        <div className="flex items-center gap-3">
          <span className="text-xl"> <Globe /></span>
          <span className="font-medium">
            {LANGS.find(l => l.code === currentLocale)?.label}
          </span>
        </div>
      </button>

      {/* DROPDOWN */}
      {mobileOpen && (
        <div className="mt-2 flex flex-col gap-2">
          {locales.filter(locale => locale !== currentLocale).map(locale => (
            <button
              key={locale}
              onClick={() => {
                setMobileOpen(false);
                changeLanguage(locale);
              }}
              disabled={locale === currentLocale || isPending}
              className={`
                flex items-center gap-3
                px-4 py-3 rounded-m border text-left
                ${
                  locale === currentLocale
                    ? 'border-gray-300 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              
              <span className="font-medium">
                 {LANGS.find(l => l.code === locale)?.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
