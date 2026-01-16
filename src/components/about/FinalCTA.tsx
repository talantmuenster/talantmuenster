'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LINKS } from '@/lib/links';

type FinalCTAProps = {
  title: string;
  subtitle?: string;
  buttonText: string;
  onClick?: () => void;
};

export function FinalCTA({
  title,
  subtitle,
  buttonText,
  onClick,
}: FinalCTAProps) {
  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-lg sm:text-xl lg:text-xl font-semibold text-primary">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            {subtitle}
          </p>
        )}

        <div className="mt-6 flex justify-center">
          <Button withArrow href={LINKS.contact} size="md" onClick={onClick }
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
