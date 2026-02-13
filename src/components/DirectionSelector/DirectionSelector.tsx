"use client";

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
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
  const [directions, setDirections] = useState<ProgramDirection[]>([]);

  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const res = await fetch('/api/programs');
        if (!res.ok) return;
        const data = await res.json();
        if (!Array.isArray(data)) return;

        const mapped = data
          .filter((item: any) => item?.slug && item?.title)
          .map((item: any) => ({
            id: item.id || item.slug,
            slug: item.slug,
            title: item.title,
          }));

        if (mapped.length > 0) {
          setDirections(mapped);
        }
      } catch (err) {
        // fallback to static
      }
    };

    fetchDirections();
  }, []);

  return (
    <section className="text-center">
      

      {/* Ссылки */}
      <div className="flex flex-wrap mb-20 justify-center gap-3 max-w-3xl mx-auto">
        {(directions.length > 0 ? directions : DIRECTIONS).map((item: any) => (
          <DirectionChip
            key={item.id}
            label={item.title ? (item.title?.[locale as keyof LocalizedContent] || item.title?.ru) : item.label}
            href={item.slug ? `/programs/${item.slug}` : item.href}
          />
        ))}
      </div>
    </section>
  );
}
