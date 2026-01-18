'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import { Logo } from './ui/Logo';
import { Button } from './ui/Button';
import { LINKS } from '../lib/links';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="relative bg-gray-950 text-white overflow-hidden">
      {/* ARCS (только десктоп) */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* LEFT — Logo & Address */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <Logo variant="secondary" size={180} />
            <p className="text-gray-400 text-sm max-w-xs">
              {t('address')}
            </p>
          </div>

          {/* CENTER — Navigation */}
          <div>
            <nav className="flex flex-col gap-3 items-center md:items-start">
              <Link href={LINKS.news} className="text-gray-300 hover:text-white transition text-sm">
                {t('news')}
              </Link>
              <Link href={LINKS.events} className="text-gray-300 hover:text-white transition text-sm">
                {t('events')}
              </Link>
              <Link href={LINKS.documents} className="text-gray-300 hover:text-white transition text-sm">
                {t('documents')}
              </Link>
              <Link href={LINKS.projects} className="text-gray-300 hover:text-white transition text-sm">
                {t('projects')}
              </Link>
              <Link href={LINKS.about} className="text-gray-300 hover:text-white transition text-sm">
                {t('about')}
              </Link>
            </nav>
          </div>

          {/* RIGHT — Social & Contact */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            
            {/* Social Icons */}
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href={LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 flex flex-col items-center md:items-start">
              <a
                href={LINKS.email}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
              >
                <Mail className="w-4 h-4" />
                {t('email')}
              </a>

              <a
                href={LINKS.phone}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
              >
                <Phone className="w-4 h-4" />
                {t('phone')}
              </a>
            </div>

            {/* Contact Button */}
            <Button variant="secondary" size="sm" href={LINKS.contact}
            >
              {t('contactUs')}
            </Button>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          className="border-t border-gray-800 mt-12 pt-8
                     flex flex-col items-center gap-4
                     md:flex-row md:justify-between"
        >
          <p className="text-gray-500 text-sm text-center">
            {t('copyright')}
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm items-center">
            <Link href={LINKS.privacy} className="text-gray-500 hover:text-white transition">
              {t('privacy')}
            </Link>
            <Link href={LINKS.cookies} className="text-gray-500 hover:text-white transition">
              {t('cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
