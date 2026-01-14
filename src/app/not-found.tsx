'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <main className="min-h-screen flex items-center justify-center bg-background-blue px-4">
      <div className="max-w-xl text-center space-y-6">
        {/* Code */}
        <div className="text-[96px] font-heading font-bold leading-none text-primary">
          404
        </div>

        {/* Title */}
        <h1 className="text-heading-lg font-medium text-gray-900">
          {t('title')}
        </h1>

        {/* Description */}
        <p className="text-gray-600 max-w-md mx-auto">
          {t('description')}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button href="/" variant='primary' size="md">
            {t('home')}
          </Button>

        </div>
      </div>
    </main>
  );
}
