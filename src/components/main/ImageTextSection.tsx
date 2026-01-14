'use client';

import Image from 'next/image';
import React from 'react';
  import { useEffect, useState } from 'react';

type StatItem = {
  value: number | string;
  label: string;
};

type ImageTextSectionProps = {
  title: React.ReactNode;
  text: React.ReactNode;
  imageSrc: string;
  imageAlt?: string;
  reverse?: boolean;
  stats?: StatItem[];
};

export function ImageTextSection({
  title,
  text,
  imageSrc,
  imageAlt = '',
  reverse = false,
  stats,
}: ImageTextSectionProps) {
  return (
    <section className="w-full py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
          
          {/* TEXT */}
          <div
            className={`
              order-1
              ${reverse ? 'lg:order-2' : 'lg:order-1'}
            `}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-family-heading leading-snug">
              {title}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
              {text}
            </p>

            {/* STATS */}
{stats && (
  <div className="mt-8">
    <div className="flex justify-center lg:justify-start gap-8 text-center">
      {stats.map((item, index) => (
        <StatCounter
          key={index}
          value={item.value}
          label={item.label}
        />
      ))}
    </div>
  </div>
)}

          </div>

          {/* IMAGE */}
          <div
            className={`
              order-2
              ${reverse ? 'lg:order-1' : 'lg:order-2'}
            `}
          >
            <div className="relative overflow-hidden rounded-2xl lg:rounded-[32px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={720}
                height={520}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


function StatCounter({
  value,
  label,
}: {
  value: number | string;
  label: string;
}) {
  const isNumber = typeof value === 'number';
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isNumber) return;

    const duration = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, isNumber]);

  return (
    <div className="flex flex-col items-center min-w-[80px]">
      <div className="text-2xl font-bold text-primary-light">
        {isNumber ? count : value}
      </div>
      <div className="mt-1 text-xs text-primary-dark">
        {label}
      </div>
    </div>
  );
}
