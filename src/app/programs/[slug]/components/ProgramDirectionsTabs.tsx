'use client';

import { useMemo, useState } from 'react';
import { MapPin, Hourglass, Euro } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import type { Locale, ProgramCourseTab } from '@/lib/programs';
import { SectionTitle } from '@/components/ui/Sectiontitle';
import { Button } from '../../../../components/ui/Button';
import CourseModal from '../../components/CourseModal';

type ProgramDirectionsTabsProps = {
  locale: Locale;
  tabs: ProgramCourseTab[];
  translations: {
    address: string;
    duration: string;
    price: string;
    ctaLabel: string;
    selectcr: string;
  };
};

export function ProgramDirectionsTabs({ locale, tabs, translations }: ProgramDirectionsTabsProps) {
  const items = useMemo(() => tabs || [], [tabs]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const active = items[activeIndex];
  if (!items.length) return null;

  const getText = (value: { ru: string; en: string; de: string }) => value[locale] || value.ru;

  return (
    <section className="py-10 lg:py-14">
      <Container>
        <div className="hidden lg:flex flex-wrap gap-3">
          {items.map((tab, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`tab-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`px-6 py-2 rounded-lg text-text-base border text-primary-dark transition ${
                  isActive
                    ? 'bg-[#B5C2FA] border-secondary text-primary-dark'
                    : 'bg-white border-[#CBD5FF] hover:bg-secondary/50'
                }`}
              >
                {getText(tab.title)}
              </button>
            );
          })}
        </div>
             
       <SectionTitle primary={getText(active.title)} className="mx-8 text-center hidden lg:block" />
        <div className="lg:hidden">
          <label className="block text-sm font-medium text-[#0A123A] mb-2">
            {translations.selectcr}
          </label>
          <div className="relative">
            <select
              value={activeIndex}
              onChange={(e) => setActiveIndex(Number(e.target.value))}
              className="w-full appearance-none rounded-2xl border border-[#CBD/5FF] bg-white px-4 py-3 text-sm font-medium text-[#0A123A]"
            >
              {items.map((tab, index) => (
                <option key={`option-${index}`} value={index}>
                  {getText(tab.title)}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7CFF]">
              ▾
            </span>
          </div>
        </div>

        {active && (
        
          <div className="mt-6 sm:mt-8 rounded-[28px] bg-[#EEF2FF] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
              <div className="text-center sm:text-left">
               <h2 className="text-2xl text-center lg:text-left sm:text-2xl font-semibold text-primary">
                  {getText(active.title)} 
                </h2> 

                <div className="mt-4 space-y-4 text-sm sm:text-base text-gray-700">
                  {getText(active.description)}
                </div>
              </div>
              <div className="space-y-4">
                {active.address && (
                  <div className="rounded-2xl bg-white px-4 py-3 border border-white/60 shadow-sm flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-primary-light">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-lgg text-gray-600 mb-1">{translations.address}</div>
                      <div className="text-text-base font-medium text-primary">{active.address}</div>
                    </div>
                  </div>
                )}
                {active.duration && (
                  <div className="rounded-2xl bg-white px-4 py-3 border border-white/60 shadow-sm flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-primary-light">
                      <Hourglass className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-lgg text-gray-600 mb-1">{translations.duration}</div>
                      <div className="text-text-base font-medium text-primary ">{active.duration}</div>
                    </div>
                  </div>
                )}
                {active.price && (
                  <div className="rounded-2xl bg-white px-4 py-3 border border-white/60 shadow-sm flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-primary-light">
                      <Euro className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-lgg text-gray-600 mb-1">{translations.price}</div>
                      <div className="text-text-base font-medium text-primary">{active.price}</div>
                    </div>
                  </div>
                )}
               <div className="justify-center lg:justify-start text-center lg:text-left">
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      withArrow
                      className="w-full mt-4 sm:mt-6 text-center justify-center"
                      variant="primary"
                    >
                      {active.ctaLabel ? getText(active.ctaLabel) : translations.ctaLabel}
                    </Button>
                  </div>

              </div>
            </div>
          </div>
        )}
      </Container>
      <CourseModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        courses={items}
        courseTitle={getText(active?.title)} 
        locale={locale}
      />
    </section>
  );
}
