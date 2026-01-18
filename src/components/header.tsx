'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

import LanguageSwitcher from './LanguageSwitcher';
import { Logo } from './ui/Logo';
import { Button } from './ui/Button';
import { LINKS } from '../lib/links';
import { useMenu } from '../utils/MenuProvider';

export default function Header() {
  const t = useTranslations('header');

  const NAV_ITEMS = [
    { href: LINKS.programs, key: 'programs' },
    { href: LINKS.news, key: 'news' },
    { href: LINKS.events, key: 'events' },
    { href: LINKS.about, key: 'about' },
  ];
 const { openMenu } = useMenu();
  return (
    <header className="  absolute top-0 left-0 right-0 z-10
    bg-transparent
    md:relative md:bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Logo size={160} />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="relative overflow-hidden h-[20px] text-sm font-medium text-primary group"
              >
                <span className="block transition-transform duration-700 group-hover:-translate-y-full">
                  {t(item.key)}
                </span>
                <span className="block absolute left-0 top-full transition-transform duration-700 group-hover:-translate-y-full">
                  {t(item.key)}
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button href={LINKS.contact} variant="secondary" size="sm">
              {t('contact')}
            </Button>
          </div>

          {/* Mobile burger */}
       <button className="md:hidden" onClick={openMenu}>
      <Menu className="w-6 h-6" />
    </button>

        </div>
      </div>
            {/* MOBILE MENU */}

    </header>
  );
}
