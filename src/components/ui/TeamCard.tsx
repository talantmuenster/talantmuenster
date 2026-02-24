'use client';

import Image from 'next/image';
import React from 'react';
import { useLocale } from 'next-intl';

type LocalizedContent = {
  ru: string;
  en: string;
  de: string;
};

type TeamCardProps = {
  name: string | LocalizedContent;
  role: string | LocalizedContent;
  image: string;
  skills?: string[];
};

export function TeamCard({ name, role, image, skills }: TeamCardProps) {
  const locale = useLocale() as 'ru' | 'en' | 'de';

  // Handle both old string format and new LocalizedContent format
  const getName = () => {
    if (typeof name === 'string') return name;
    return name[locale] || name.ru || '';
  };

  const getRole = () => {
    if (typeof role === 'string') return role;
    return role[locale] || role.ru || '';
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 h-full">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={getName()}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="mt-4 text-center">
        <div className="font-semibold text-primary-dark">
          {getName()}
        </div>
        <div className="text-sm text-gray-500">
          {getRole()}
        </div>
        {skills && skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1 justify-center">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
