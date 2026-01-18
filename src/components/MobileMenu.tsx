'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useMenu } from '../utils/MenuProvider';
import { Button } from './ui/Button';
import { useTranslations } from 'next-intl';
import { LINKS } from '../lib/links';
import LanguageSwitcher from './LanguageSwitcher';

export default function MobileMenu() {
  const { open, closeMenu } = useMenu();
  const t = useTranslations('header');

  const NAV_ITEMS = [
    { href: LINKS.programs, key: 'programs' },
    { href: LINKS.news, key: 'news' },
    { href: LINKS.events, key: 'events' },
    { href: LINKS.about, key: 'about' },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        bg-white
        h-[100dvh]
        flex flex-col
        overflow-hidden
      "
    >
      {/* TOP */}
      <div className="px-6 pt-8 pb-6 flex items-center justify-between shrink-0">
        <h2 className="text-2xl font-semibold text-primary">
          Меню
        </h2>
        <button onClick={closeMenu} aria-label="Закрыть меню">
          <X className="w-6 h-6 text-primary/70" />
        </button>
      </div>

      {/* NAV */}
      <div className="flex-1 overflow-y-auto px-6">
        <nav aria-label="Основная навигация">
          <ul className="flex flex-col gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="
                    flex items-center justify-between
                    text-lg font-medium text-primary
                  "
                >
                  <span>{t(item.key)}</span>
                  <span className="text-primary-light text-xl">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="px-6 pt-6 pb-8 shrink-0 bg-white flex flex-col gap-4">
		<LanguageSwitcher variant='mob' />
            <Button
            href={LINKS.contact}
                        variant="secondary"
                        className="mt-8 mx-auto lg:mx-0 w-full justify-center"
                      >
          Связаться
        </Button>
      </div>
    </div>
  );
}
