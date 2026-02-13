'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import type { ProgramHeroData, Locale } from '@/lib/programs';
import { useState } from 'react';

type RelatedProgramsProps = {
  currentProgram: ProgramHeroData;
  allPrograms: ProgramHeroData[];
  locale: Locale;
};

export function RelatedPrograms({ currentProgram, allPrograms, locale }: RelatedProgramsProps) {
  const otherPrograms = allPrograms.filter((p) => p.slug !== currentProgram.slug && p.published);

  if (otherPrograms.length === 0) return null;

  return (
    <section className="py-12 lg:py-16 bg-white">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A123A] mb-2">
            Смотрите так же другие
          </h2>
          <p className="text-[#0A123A]/60">направления</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={`/programs/${currentProgram.slug}`}
            className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium transition hover:bg-blue-600"
          >
            {currentProgram.title[locale] || currentProgram.title.ru}
          </Link>
          {otherPrograms.map((program) => (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="px-4 py-2 rounded-full border border-[#E5E7EB] text-[#0A123A] text-sm font-medium transition hover:border-[#0A123A] hover:bg-[#F9FAFB]"
            >
              {program.title[locale] || program.title.ru}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
