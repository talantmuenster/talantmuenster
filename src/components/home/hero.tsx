'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { BookOpen, Calendar, Laptop } from 'lucide-react';
import { Button } from '../ui/Button';

export default function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto lg:px-8  ">
        <div
          className="
           bg-[url('/banner-background-desctop.png')]
      bg-no-repeat bg-cover bg-center
            rounded-none
            pt-10
            lg:rounded-[32px] lg:pt-0
          "
        >
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">

            {/* ================= LEFT / MOBILE FLOW ================= */}
            <div className="flex flex-col p-6 sm:p-8 lg:p-14">

              {/* TEXT */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight max-w-xl">
                {t('title')}
              </h1>

              <p className="mt-4 text-sm sm:text-base text-[#475569] max-w-lg">
                {t('description')}
              </p>

              {/* IMAGE — MOBILE (между текстом и карточками) */}
              <div
                className="
                  mt-6
                  lg:hidden
              
                  w-[100%]
                  aspect-[3/4]
                  relative
                "
              >
                <Image
                  src="/home/hero.png"
                  alt="Student"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>

              {/* MOBILE CARDS (как в макете) */}
              <div className="mt-[-60PX] flex flex-col gap-4 lg:hidden z-20">
                <InfoCard
                  icon={<BookOpen className="w-5 h-5" />}
                  title={t('stat1Title')}
                  subtitle={t('stat1Subtitle')}
                />
                <InfoCard
                  icon={<Calendar className="w-5 h-5" />}
                  title={t('stat2Title')}
                  subtitle={t('stat2Subtitle')}
                />
                <InfoCard
                  icon={<Laptop className="w-5 h-5" />}
                  title={t('stat3Title')}
                  subtitle={t('stat3Subtitle')}
                />
              </div>

              {/* BUTTON — BOTTOM */}
              <Button
                variant="primary"
                className="mt-8 mx-auto lg:mx-0 w-max"
              >
                {t('learnMore')}
              </Button>

              {/* DESKTOP PILLS */}
              <div className="hidden lg:flex flex-wrap gap-3 mt-8">
                <InfoPill
                  icon={<BookOpen className="w-4 h-4" />}
                  title={t('stat1Title')}
                  subtitle={t('stat1Subtitle')}
                />
                <InfoPill
                  icon={<Calendar className="w-4 h-4" />}
                  title={t('stat2Title')}
                  subtitle={t('stat2Subtitle')}
                />
                <InfoPill
                  icon={<Laptop className="w-4 h-4" />}
                  title={t('stat3Title')}
                  subtitle={t('stat3Subtitle')}
                />
              </div>
            </div>

            {/* ================= RIGHT / DESKTOP IMAGE ================= */}
            <div className="hidden lg:flex  ">
              <div className="relative w-full aspect-square">
                <Image
                  src="/home/hero.png"
                  alt="Student"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= DESKTOP PILL ================= */

function InfoPill({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string; 
}) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm">
      <div className="text-indigo-700 shrink-0">{icon}</div>
      <div className="leading-tight">
        <div className="text-xs font-semibold text-[#1E293B]">
          {title}
        </div>
        <div className="text-[11px] text-[#64748B]">
          {subtitle}
        </div>
      </div>
    </div>
  );
}

/* ================= MOBILE CARD ================= */

function InfoCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className="
        flex items-center gap-4
        bg-white
        rounded-2xl
        px-5 py-4
        shadow-sm
        
      "
    >
      <div className="text-indigo-700 shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-[#1E293B]">
          {title}
        </div>
        <div className="text-xs text-[#64748B]">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
