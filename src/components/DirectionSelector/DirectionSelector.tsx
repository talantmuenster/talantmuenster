"use client";

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { DIRECTIONS } from '@/data/direction';
import { DirectionChip } from './DirectionChip';
import type { LocalizedContent } from '@/type/type';

type ProgramDirection = {
  id: string;
  slug: string;
  title: LocalizedContent;
};

export function DirectionSelector() {
  const locale = useLocale();
  const t = useTranslations('courses');
  const [directions, setDirections] = useState<ProgramDirection[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchDirections = async () => {
      try {
        console.log('🔍 DirectionSelector: Fetching programs from API...');
        const res = await fetch('/api/programs');
        console.log('🔍 DirectionSelector: API response status:', res.status);
        
        if (!res.ok) {
          console.warn('🔍 DirectionSelector: API request failed');
          return;
        }
        
        const data = await res.json();
        console.log('🔍 DirectionSelector: API returned data:', data);
        
        if (!Array.isArray(data)) {
          console.warn('🔍 DirectionSelector: Data is not an array');
          return;
        }

        const mapped = data
          .filter((item: any) => item?.slug && item?.title)
          .map((item: any) => ({
            id: item.id || item.slug,
            slug: item.slug,
            title: item.title,
          }));

        console.log('🔍 DirectionSelector: Mapped directions:', mapped.length);
        
        if (mapped.length > 0) {
          setDirections(mapped);
        } else {
          console.log('🔍 DirectionSelector: No programs found, using fallback DIRECTIONS');
        }
      } catch (err) {
        console.error('🔍 DirectionSelector: Error fetching programs:', err);
        // fallback to static
      } finally {
        setLoaded(true);
      }
    };

    fetchDirections();
  }, []);

  return (
    <section className="text-center">
      

      {/* Ссылки */}
      {!loaded ? null : directions.length === 0 ? (
        <p className="text-center text-gray-500 mb-20 text-lg">{t('empty')}</p>
      ) : (
        <div className="flex flex-wrap mb-20 justify-center gap-3 max-w-3xl mx-auto">
          {directions.map((item: any) => (
            <DirectionChip
              key={item.id}
              label={item.title ? (item.title?.[locale as keyof LocalizedContent] || item.title?.ru) : item.label}
              href={item.slug ? `/programs/${item.slug}` : item.href}
            />
          ))}
        </div>
      )}
    </section>
  );
}
