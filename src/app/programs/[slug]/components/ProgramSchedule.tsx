'use client';

import { useMemo, useState } from 'react';
import { Container } from '@/components/ui/Container';
import type { Locale, ProgramSchedule } from '@/lib/programs';
import { useTranslations } from 'next-intl';

type ProgramScheduleProps = {
  locale: Locale;
  schedule?: ProgramSchedule;
};


export function ProgramSchedule({ locale, schedule }: ProgramScheduleProps) {
  const t = useTranslations("courses");
  const dayLabels: Record<ProgramSchedule['items'][number]['day'], string> = {
    mon: t('days.mon'),
    tue: t('days.tue'),
    wed: t('days.wed'),
    thu: t('days.thu'),
    fri: t('days.fri'),
    sat: t('days.sat'),
    sun: t('days.sun'),
  };

  const getText = (value: { ru: string; en: string; de: string }) => value[locale] || value.ru;
  
  // Динамически вычислять timeSlots из items
  const timeSlots = useMemo(() => {
    if (!schedule) return [];
    const times = new Set(schedule.items.map(item => item.time));
    return Array.from(times).sort();
  }, [schedule]);
  
  const days = useMemo(() => {
    if (!schedule) return [];
    const allDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
    const uniqueDays = Array.from(new Set(schedule.items.map(item => item.day)));
    return allDays.filter(day => uniqueDays.includes(day));
  }, [schedule]);
  
  // Инициализировать activeDay первым доступным днем
  const [activeDay, setActiveDay] = useState<string>(() => {
    if (!schedule) return '';
    const allDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
    const uniqueDays = Array.from(new Set(schedule.items.map(item => item.day)));
    const availableDays = allDays.filter(day => uniqueDays.includes(day));
    return availableDays.length > 0 ? availableDays[0] : '';
  });

  if (!schedule || schedule.items.length === 0) return null;

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A123A] text-center">{t('schedule.title')}</h2>

        <div className="mt-6 sm:mt-8">
          {/* Mobile */}
          <div className="sm:hidden">
            <div className="rounded-t-[12px] bg-[#0A123A] text-white text-sm font-medium flex overflow-hidden">
              {days.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setActiveDay(day)}
                  className={`flex-1 px-4 py-3 transition-all ${
                    activeDay === day 
                      ? 'bg-primary-light text-white font-bold shadow-lg' 
                      : 'bg-[#0A123A] hover:bg-[#1a2350]'
                  }`}
                >
                  {dayLabels[day]}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              {timeSlots.map((slot) => {
                const dayItems = schedule.items.filter((item) => item.day === activeDay && item.time === slot);
                if (dayItems.length === 0) return null;
                return (
                  <div key={`mobile-${slot}`} className="space-y-2">
                    <div className="text-xs text-[#0A123A]/60">{slot}</div>
                    {dayItems.map((item, index) => (
                        <div
                          key={`mobile-${slot}-${index}`}
                          className="relative rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-xs text-[#0A123A]/80 shadow-sm"
                        >
                          <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-[#A4B5FF]" />
                          <div className="ml-2">
                            <div className="font-medium text-[#0A123A]">{getText(item.title)}</div>
                            {item.teacher && (
                              <div className="text-[#0A123A]/60">{getText(item.teacher)}</div>
                            )}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <div className="min-w-[720px] rounded-[16px] border border-[#E5E7EB] overflow-hidden">
              <div className="grid grid-cols-[140px_repeat(7,minmax(120px,1fr))] bg-[#0A123A] text-white text-sm">
                <div className="px-4 py-3 font-medium">Время</div>
                {(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const).map((day) => (
                  <div key={day} className="px-4 py-3 font-medium">
                    {dayLabels[day]}
                  </div>
                ))}
              </div>

              {timeSlots.map((slot) => (
                <div
                  key={slot}
                  className="grid grid-cols-[140px_repeat(7,minmax(120px,1fr))] border-t border-[#E5E7EB]"
                >
                  <div className="px-4 py-4 text-sm text-[#0A123A]/70">{slot}</div>
                  {(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const).map((day) => {
                    const cellItems = schedule.items.filter((item) => item.day === day && item.time === slot);
                    return (
                      <div key={`${slot}-${day}`} className="px-3 py-3">
                        {cellItems.map((item, index) => (
                          <div
                            key={`${slot}-${day}-${index}`}
                            className="relative rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-xs text-[#0A123A]/80 shadow-sm"
                          >
                            <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-[#A4B5FF]" />
                            <div className="ml-2">
                              <div className="font-medium text-[#0A123A]">{getText(item.title)}</div>
                              {item.teacher && (
                                <div className="text-[#0A123A]/60">{getText(item.teacher)}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
