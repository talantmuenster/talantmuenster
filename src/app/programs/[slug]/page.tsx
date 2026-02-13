import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { ProgramHero } from './components/ProgramHero';
import { ProgramDirectionsTabs } from './components/ProgramDirectionsTabs';
import { ProgramTeachers } from './components/ProgramTeachers';
import { ProgramSchedule } from './components/ProgramSchedule';
import { RelatedPrograms } from './components/RelatedPrograms';
import { programs } from '@/data/programs';
import type { Locale } from '@/lib/programs';

export const dynamic = 'force-dynamic';

export default async function ProgramSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const locale = await getLocale();
  const safeLocale: Locale = locale === 'en' || locale === 'de' || locale === 'ru' ? locale : 'ru';
  const { slug } = await params;

  if (!slug) {
    return notFound();
  }

  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
  const program = programs.find((item) => item.slug.toLowerCase() === normalizedSlug) || programs[0];
  if (!program || program.published === false) {
    return notFound();
  }

  const title = program.title[safeLocale] || program.title.ru;
  const subtitle = program.subtitle[safeLocale] || program.subtitle.ru;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <ProgramHero
          title={title}
          subtitle={subtitle}
          cover={program.cover}
          slides={program.heroSlides}
          breadcrumbs={[
            { label: 'Главная', href: '/' },
            { label: 'Программы', href: '/programs' },
            { label: title },
          ]}
        />
        <ProgramDirectionsTabs locale={safeLocale} tabs={program.courseTabs || []} />
        <ProgramTeachers items={program.teachers || []} locale={safeLocale} />
        <ProgramSchedule locale={safeLocale} schedule={program.schedule} />
        <RelatedPrograms currentProgram={program} allPrograms={programs} locale={safeLocale} />
      </main>
    </div>
  );
}
