'use client';

import { Button } from '@/components/ui/Button';
import type { CalendarEvent } from '@/type/type';
import { useLocale, useTranslations } from 'next-intl';

type Props = {
  events: CalendarEvent[];
};

export function EventsSchedule({ events }: Props) {
     const t = useTranslations('home.upcomingEvents');
     const locale = useLocale();
  
  const getText = (content: any) => {
    if (!content) return '';
    if (typeof content === 'string') return content;
    return content[locale as keyof typeof content] || content.ru || '';
  };

  return (
    <div className="flex flex-col gap-4">
      {events.map(event => {
        const date = new Date(event.date);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const weekday = date.toLocaleDateString(locale, {
          weekday: 'long',
        });

        return (
          <div
            key={event.id}
            className="bg-white rounded-2xl p-5 flex gap-6 items-stretch"
          >
            {/* DATE — во всю высоту */}
            <div className="bg-primary-light/20 rounded-xl p-4 min-w-[96px] h-full flex flex-col justify-center text-center">
              <div className="text-heading-lg font-heading text-primary">
                {day}.{month}
              </div>
              <div className="text-sm text-primary capitalize">
                {weekday}
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1">
              <div className="text-lgg text-text-secondary">
                {event.startTime} – {event.endTime}
              </div>

              <div className="font-medium text-heading-mdd mt-2 mb-2 text-primary-dark">
                {getText(event.title)}
              </div>

              <div className="text-sm text-text-secondary mb-4">
                {getText(event.description)}
              </div>

              <Button
                variant="text"
                withArrow
                size="sm"
                className="px-0"
              >
                {t("other1")}
              </Button>
            </div>

            {/* REGISTRATION — ВСЕГДА ВИДНА */}
            <Button
              size="sm"
              variant="secondary"
              className="ml-auto self-center"
              disabled={!event.registrationUrl}
            >
              {t("registration")}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
