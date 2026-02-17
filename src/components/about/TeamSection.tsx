'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { TeamCard } from '@/components/ui/TeamCard';
import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/Sectiontitle';

type TeamMember = {
  name: string;
  role: string;
  image: string;
};

type TeamSectionProps = {
  title?: string;
  members: TeamMember[];
};

export function TeamSection({
  title = 'Наша команда',
  members,
}: TeamSectionProps) {
    const t = useTranslations("about");
  
  return (
    <section className="w-full py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* TITLE */}
        <SectionTitle className="text-center" primary={t("team.title1")} secondary={t("team.title2")} />
        

        {/* MOBILE / TABLET — SLIDER */}
        <div className="mt-8 lg:hidden">
          <Swiper
            spaceBetween={16}
            grabCursor
            breakpoints={{
              0: { slidesPerView: 1.2 },
              480: { slidesPerView: 1.5 },
              640: { slidesPerView: 2 },
            }}
          >
            {members.map((member, index) => (
              <SwiperSlide key={index} className="h-auto">
                <TeamCard {...member} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* DESKTOP — GRID */}
        <div className="hidden lg:grid mt-10 grid-cols-4 gap-6">
          {members.map((member, index) => (
            <TeamCard key={index} {...member} />
          ))}
        </div>

      </div>
    </section>
  );
}
