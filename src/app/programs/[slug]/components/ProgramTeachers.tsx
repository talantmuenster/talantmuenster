'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Container } from '@/components/ui/Container';
import type { Locale, ProgramTeacher } from '@/lib/programs';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ProgramTeachersProps = {
  items: ProgramTeacher[];
  locale: Locale;
  teachersLabel: string;
};

export function ProgramTeachers({
  items,
  locale,
  teachersLabel,
}: ProgramTeachersProps) {
  const teachers = useMemo(() => items || [], [items]);
  const [index, setIndex] = useState(0);
  const total = teachers.length;
  const active = teachers[index];

  if (!total) return null;

  const getText = (value?: { ru: string; en: string; de: string }) =>
    value ? value[locale] || value.ru : '';

  const prev = () =>
    setIndex((i) => (i - 1 + total) % total);

  const next = () =>
    setIndex((i) => (i + 1) % total);

  return (
    <section className="py-16 lg:py-28">
      <Container>

        {/* SECTION TITLE */}
        <h2 className="text-3xl lg:text-4xl font-semibold text-[#1C2B59] text-center">
          {teachersLabel}
        </h2>

        <div className="relative mt-14 flex items-center justify-center lg:px-20 ">

          {/* DESKTOP LEFT ARROW */}
          <button
            onClick={prev}
            className="hidden lg:flex absolute left-0 w-14 h-14 rounded-full border border-[#F9A352] text-[#F9A352] items-center justify-center hover:bg-[#F9A352] hover:text-white transition-all duration-300"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl mx-auto w-full">

            {/* ===== AVATAR BLOCK ===== */}
            <div className="flex flex-col items-center">

              <div className="relative w-[220px] h-[220px] lg:w-[320px] lg:h-[320px]">

                {/* ARC */}
                <div
                  className="absolute inset-0 rounded-full
                  bg-[conic-gradient(#F9A352_0deg,#F9A352_180deg,transparent_180deg)]
                  rotate-180"
                />

                {/* IMAGE */}
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
            </div>

            {/* ===== CONTENT BLOCK ===== */}
            <div className="max-w-xl text-left mt-10 lg:mt-0 w-full">

              {/* NAME + MOBILE ARROWS */}
              <div className="flex items-center justify-center lg:justify-start gap-6">

                {/* MOBILE LEFT */}
                <button
                  onClick={prev}
                  className="lg:hidden w-12 h-12 rounded-full border border-[#F9A352] text-[#F9A352] flex items-center justify-center hover:bg-[#F9A352] hover:text-white transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex flex-col items-center lg:items-start">

                <h3 className="text-xl lg:text-3xl font-semibold text-[#1C2B59]">
                  {getText(active.name)}
                </h3>

                
                              {/* ROLE */}
                              {active.role && (
                                <p className="mt-2 text-sm lg:text-base text-center text-[#1C2B59]/60">
                                  {getText(active.role)}
                                </p>
                              )}
                </div>
                {/* MOBILE RIGHT */}
                <button
                  onClick={next}
                  className="lg:hidden w-12 h-12 rounded-full border border-[#F9A352] text-[#F9A352] flex items-center justify-center hover:bg-[#F9A352] hover:text-white transition"
                >
                  <ChevronRight size={20} />
                </button>

              </div>

              {/* BIO */}
              {active.bio && (
                <p className="mt-5 lg:mt-6 text-sm lg:text-base text-[#1C2B59]/70 leading-relaxed">
                  {getText(active.bio)}
                </p>
              )}

              {/* TAGS */}
              {active.tags && active.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3 justify-start">
                  {active.tags.map((tag, i) => (
                    <span
                      key={`${getText(tag)}-${i}`}
                      className="px-4 py-2 rounded-full bg-[#FFE4CB] text-[#1C2B59] text-sm font-medium"
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
            className="hidden lg:flex absolute right-0 w-14 h-14 rounded-full border border-[#F9A352] text-[#F9A352] items-center justify-center hover:bg-[#F9A352] hover:text-white transition-all duration-300"
          >
            <ChevronRight size={22} />
          </button>

        </div>
      </Container>
    </section>
  );
}
