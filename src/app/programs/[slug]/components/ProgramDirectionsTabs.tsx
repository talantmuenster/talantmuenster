'use client';

import { useMemo, useState } from 'react';
import { MapPin, Hourglass, Euro } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import type { Locale, ProgramCourseTab } from '@/lib/programs';

type ProgramDirectionsTabsProps = {
  locale: Locale;
  tabs: ProgramCourseTab[];
};

export function ProgramDirectionsTabs({ locale, tabs }: ProgramDirectionsTabsProps) {
  const items = useMemo(() => tabs || [], [tabs]);
  const [activeIndex, setActiveIndex] = useState(0);
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
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  isActive
                    ? 'bg-[#EEF2FF] border-[#A4B5FF] text-[#0A123A]'
                    : 'bg-white border-[#CBD5FF] text-[#0A123A]/80 hover:bg-[#F4F6FF]'
                }`}
              >
                {getText(tab.title)}
              </button>
            );
          })}
        </div>

        <div className="lg:hidden">
          <label className="block text-sm font-medium text-[#0A123A] mb-2">
            Выберите курс
          </label>
          <div className="relative">
            <select
              value={activeIndex}
              onChange={(e) => setActiveIndex(Number(e.target.value))}
              className="w-full appearance-none rounded-2xl border border-[#CBD5FF] bg-white px-4 py-3 text-sm font-medium text-[#0A123A]"
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
                <h2 className="text-xl sm:text-2xl font-semibold text-[#0A123A]">
                  {getText(active.title)}
                </h2>
                <div className="mt-4 space-y-4 text-sm sm:text-base text-[#0A123A]/70">
                  {getText(active.description)}
                </div>
              </div>
              <div className="space-y-4">
                {active.address && (
                  <div className="rounded-2xl bg-white px-4 py-3 border border-white/60 shadow-sm flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full border border-[#CBD5FF] flex items-center justify-center text-[#6B7CFF]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-[#0A123A]/60">Адрес</div>
                      <div className="text-sm font-medium text-[#0A123A]">{active.address}</div>
                    </div>
                  </div>
                )}
                {active.duration && (
                  <div className="rounded-2xl bg-white px-4 py-3 border border-white/60 shadow-sm flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full border border-[#CBD5FF] flex items-center justify-center text-[#6B7CFF]">
                      <Hourglass className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-[#0A123A]/60">Длительность занятия</div>
                      <div className="text-sm font-medium text-[#0A123A]">{active.duration}</div>
                    </div>
                  </div>
                )}
                {active.price && (
                  <div className="rounded-2xl bg-white px-4 py-3 border border-white/60 shadow-sm flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full border border-[#CBD5FF] flex items-center justify-center text-[#6B7CFF]">
                      <Euro className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-[#0A123A]/60">Стоимость занятия</div>
                      <div className="text-sm font-medium text-[#0A123A]">{active.price}</div>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  className="w-full rounded-full bg-[#0A123A] text-white py-3 text-sm font-medium hover:opacity-90 transition"
                >
                  {active.ctaLabel ? getText(active.ctaLabel) : 'Записаться на курс →'}
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
