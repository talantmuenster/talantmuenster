'use client';

import Image from 'next/image';
import React from 'react';

type TeamCardProps = {
  name: string;
  role: string;
  image: string;
};

export function TeamCard({ name, role, image }: TeamCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 h-full">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-4 text-center">
        <div className="font-semibold text-primary-dark">
          {name}
        </div>
        <div className="text-sm text-gray-500">
          {role}
        </div>
      </div>
    </div>
  );
}
