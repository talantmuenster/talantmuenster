import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { ProgramHero } from './components/ProgramHero';
import { ProgramDirectionsTabs } from './components/ProgramDirectionsTabs';
import { ProgramTeachers } from './components/ProgramTeachers';
import { ProgramSchedule } from './components/ProgramSchedule';
import { RelatedPrograms } from './components/RelatedPrograms';
import type { Locale, ProgramHeroData } from '@/lib/programs';
import { LINKS } from '../../../lib/links';

export const dynamic = 'force-dynamic';

async function getPrograms(): Promise<ProgramHeroData[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/programs`, { 
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    if (!res.ok) {
      console.error('Failed to fetch programs, status:', res.status);
      return [];
    }
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error('Failed to fetch programs:', err);
    return [];
  }
}

export default async function ProgramSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const t = await getTranslations("courses");
  const locale = await getLocale();
  const safeLocale: Locale = locale === 'en' || locale === 'de' || locale === 'ru' ? locale : 'ru';
  const { slug } = await params;

  if (!slug) {
    return notFound();
  }

  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
  const programs = await getPrograms();
  const program = programs.find((item) => item.slug.toLowerCase() === normalizedSlug);
  
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
            { label: t("breadcrumbs.home"), href: LINKS.home },
				{ label: t("breadcrumbs.programs"), href: LINKS.programs },
            { label: title },
          ]}
        />
        <ProgramDirectionsTabs 
          locale={safeLocale} 
          tabs={program.courseTabs || []} 
          translations={{
            address: t("address"),
            duration: t("duration"),
            price: t("price"),
            ctaLabel: t("ctaLabel"),

            selectcr: t("selectcr")
            
          }}
        />
        <ProgramTeachers items={program.teachers || []} locale={safeLocale} teachersLabel={t("teachers")} />
        <ProgramSchedule locale={safeLocale} schedule={program.schedule} />
        <RelatedPrograms 
          currentProgram={program} 
          allPrograms={programs} 
          locale={safeLocale} 
          relatprogtitl1={t("relatprogtitl1")}
          relatprogtitl2={t("relatprogtitl2")}
        />
      </main>
    </div>
  );
}
