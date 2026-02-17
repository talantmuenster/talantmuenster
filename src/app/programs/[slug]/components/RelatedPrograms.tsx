'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import type { ProgramHeroData, Locale } from '@/lib/programs';
import { useState } from 'react';
import { SectionTitle } from '../../../../components/ui/Sectiontitle';

type RelatedProgramsProps = {
  currentProgram: ProgramHeroData;
  allPrograms: ProgramHeroData[];
  locale: Locale;
  relatprogtitl1: string;
  relatprogtitl2: string;
};

export function RelatedPrograms({ currentProgram, allPrograms, locale, relatprogtitl1, relatprogtitl2 }: RelatedProgramsProps) {
  const otherPrograms = allPrograms.filter((p) => p.slug !== currentProgram.slug && p.published);

  if (otherPrograms.length === 0) return null;

  return (
    <section className="py-12 lg:py-16 bg-white">
      <Container>
               <SectionTitle primary={relatprogtitl1} secondary={relatprogtitl2} className="mb-10 text-center " />
        
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={`/programs/${currentProgram.slug}`}
            className="px-6 py-2 rounded-lg text-text-base border text-primary-dark transition bg-[#B5C2FA] border-secondary "
          >
            {currentProgram.title[locale] || currentProgram.title.ru}
          </Link>
          {otherPrograms.map((program) => (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="px-6 py-2 rounded-lg text-text-base border bg-white border-[#CBD5FF] hover:bg-secondary/50"
            >
              {program.title[locale] || program.title.ru}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
