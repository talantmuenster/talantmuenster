'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Container } from '@/components/ui/Container';

type Breadcrumb = {
  label: string;
  href?: string;
};

type ProgramHeroProps = {
  title: string;
  subtitle: string;
  cover: string;
  slides?: string[];
  breadcrumbs?: Breadcrumb[];
};

export function ProgramHero({ title, subtitle, cover, slides, breadcrumbs }: ProgramHeroProps) {
  const images = useMemo(() => {
    const base = slides && slides.length > 0 ? slides : [cover];
    return base.length > 0 ? base : [cover];
  }, [slides, cover]);
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prev = () => setCurrent((index) => (index - 1 + total) % total);
  const next = () => setCurrent((index) => (index + 1) % total);

  const showControls = total > 1;

  return (
    <section className="w-full py-10 lg:py-16">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            {breadcrumbs && (
              <div className="mb-4 inline-flex items-center gap-2 text-xs sm:text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
                {breadcrumbs.map((item, index) => (
                  <span key={`${item.label}-${index}`} className="flex items-center gap-2">
                    {index !== 0 && <span>›</span>}
                    {item.href ? (
                      <Link href={item.href} className="hover:text-gray-900 transition-colors">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-gray-900 font-medium">{item.label}</span>
                    )}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A123A]">{title}</h1>
            <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
              {subtitle}
            </p>
          </div>

          <div className="flex-1 w-full">
            <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-lg">
              {showControls && (
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/80 bg-white/80 text-[#6B7CFF] flex items-center justify-center hover:bg-white transition"
                  aria-label="Предыдущий слайд"
                >
                  ‹
                </button>
              )}
              <Image
                src={images[current]}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {showControls && (
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/80 bg-white/80 text-[#6B7CFF] flex items-center justify-center hover:bg-white transition"
                  aria-label="Следующий слайд"
                >
                  ›
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section> 
  );
}
