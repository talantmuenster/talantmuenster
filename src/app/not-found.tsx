'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background-blue px-4">
      <div className="max-w-xl text-center space-y-6">
        {/* 404 */}
        <div className="text-[96px] font-heading font-bold leading-none text-primary">
          404
        </div>

        {/* Title */}
        <h1 className="text-heading-lg font-medium text-gray-900">
          Страница не найдена
        </h1>

        {/* Description */}
        <p className="text-gray-600 max-w-md mx-auto">
          К сожалению, такой страницы не существует или она была перемещена.
        </p>

        {/* Button */}
        <div className="flex justify-center pt-4">
          <Link
            href="/"
            className="
              relative overflow-hidden
              inline-flex items-center gap-2
              rounded-full font-medium
              transition-colors duration-200
              focus:outline-none
              group
              px-6 py-3 text-[18px]
              bg-primary text-white
              active:bg-secondary active:text-primary
            "
          >
            <span
              className="
                absolute inset-0
                origin-left scale-x-0
                transition-transform duration-300
                group-hover:scale-x-100
                group-active:scale-x-100
                rounded-full z-0
                bg-primary-light group-active:bg-secondary
              "
            />

            <span className="relative z-10 flex items-center gap-2">
              На главную
              <ArrowRight className="
                w-6 h-6 stroke-current
                text-primary-light
                transition-all duration-200
                group-hover:text-accent
                group-active:text-primary-dark
              " />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
