'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Container } from '@/components/ui/Container';
import type { Locale, ProgramTeacher } from '@/lib/programs';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ProgramTeachersProps = {
  items: ProgramTeacher[];
  locale: Locale;
};

export function ProgramTeachers({ items, locale }: ProgramTeachersProps) {
  const teachers = useMemo(() => items || [], [items]);
  const [index, setIndex] = useState(0);
  const total = teachers.length;
  const active = teachers[index];

  if (!total) return null;

  const getText = (value?: { ru: string; en: string; de: string }) =>
    value ? value[locale] || value.ru : '';

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="bg-[#F4F5F7] py-16 lg:py-28">
      <Container>
        <h2 className="text-3xl lg:text-4xl font-semibold text-[#1C2B59] text-center">
          Преподаватели
        </h2>

        <div className="relative mt-14 flex items-center justify-center">

          {/* DESKTOP LEFT ARROW */}
          <button
            onClick={prev}
            className="hidden lg:flex absolute left-0 w-14 h-14 rounded-full border border-[#F2B177] text-[#F2B177] items-center justify-center hover:bg-[#F2B177] hover:text-white transition-all duration-300"
            aria-label="Предыдущий преподаватель"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl mx-auto">

            {/* ===== AVATAR BLOCK ===== */}
            <div className="flex flex-col items-center">

              <div className="relative w-[220px] h-[220px] lg:w-[320px] lg:h-[320px]">

                {/* ORANGE ARC */}
                <div className="absolute inset-0 rounded-full border-[16px] lg:border-[20px] border-[#F2B177] border-r-transparent border-b-transparent rotate-[-25deg]" />

                <div className="absolute inset-[16px] lg:inset-[20px] rounded-full overflow-hidden shadow-lg bg-white">
                  <Image
                    src={active.avatar}
                    alt={getText(active.name)}
                    fill
                    sizes="(max-width: 1024px) 220px, 320px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* MOBILE ARROWS */}
              <div className="flex gap-6 mt-6 lg:hidden">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full border border-[#F2B177] text-[#F2B177] flex items-center justify-center hover:bg-[#F2B177] hover:text-white transition"
                  aria-label="Предыдущий преподаватель"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full border border-[#F2B177] text-[#F2B177] flex items-center justify-center hover:bg-[#F2B177] hover:text-white transition"
                  aria-label="Следующий преподаватель"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* ===== CONTENT BLOCK ===== */}
            <div className="max-w-xl text-center lg:text-left mt-10 lg:mt-0">

              <h3 className="text-xl lg:text-3xl font-semibold text-[#1C2B59]">
                {getText(active.name)}
              </h3>

              {active.role && (
                <p className="mt-2 text-sm lg:text-base text-[#1C2B59]/60">
                  {getText(active.role)}
                </p>
              )}

              {active.bio && (
                <p className="mt-5 lg:mt-6 text-sm lg:text-base text-[#1C2B59]/70 leading-relaxed">
                  {getText(active.bio)}
                </p>
              )}

              {active.tags?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                  {active.tags.map((tag, i) => (
                    <span
                      key={`${getText(tag)}-${i}`}
                      className="px-4 py-2 rounded-full bg-[#FFE6D2] text-[#1C2B59] text-sm font-medium"
                    >
                      {getText(tag)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* DESKTOP RIGHT ARROW */}
          <button
            onClick={next}
            className="hidden lg:flex absolute right-0 w-14 h-14 rounded-full border border-[#F2B177] text-[#F2B177] items-center justify-center hover:bg-[#F2B177] hover:text-white transition-all duration-300"
            aria-label="Следующий преподаватель"
          >
            <ChevronRight size={22} />
          </button>

        </div>
      </Container>
    </section>
  );
}
