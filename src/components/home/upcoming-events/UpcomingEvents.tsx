'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '../../ui/Sectiontitle';
import type { CalendarEvent } from '@/type/type';
import { EventsSchedule } from './EventsSchedule';
import MobileEventsSlider from './MobileEventsSlider.client';
import { useState } from 'react';
import { EventRegistrationModal } from '@/components/events/EventRegistrationModal';
import { LINKS } from '../../../lib/links';
import { useTranslations } from 'next-intl';

type Props = {
  calendarEvents: CalendarEvent[];
};

export function UpcomingEvents({ calendarEvents }: Props) {
    const t = useTranslations('home.upcomingEvents');
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    // Фильтрация событий по дате (оставляем только будущие и сегодняшние)
    const now = new Date();
    const upcomingEvents = calendarEvents.filter(ev => {
      if (!ev.date) return false;
      const eventDate = new Date(ev.date);
      // Событие показывается, если оно сегодня или в будущем
      return eventDate.setHours(0,0,0,0) >= now.setHours(0,0,0,0);
    });

    // Открытие модалки регистрации
    const handleOpenRegModal = (event: CalendarEvent) => {
      setSelectedEvent(event);
      setIsRegModalOpen(true);
    };
    const handleCloseRegModal = () => {
      setIsRegModalOpen(false);
      setSelectedEvent(null);
    };

    // Обертки для передачи в дочерние компоненты
    const mobileSliderEvents = upcomingEvents.map(ev => ({
      ...ev,
      onRegister: () => handleOpenRegModal(ev),
    }));
    const scheduleEvents = upcomingEvents.map(ev => ({
      ...ev,
      onRegister: () => handleOpenRegModal(ev),
    }));

    return (
      <section className="relative bg-background-blue py-20 lg:overflow-hidden">
        {/* ARCS */}
        <div
          className="pointer-events-none absolute -top-[320px] -left-[320px] w-[750px] h-[750px] rounded-full border-[50px] z-0 hidden lg:block"
          style={{ borderColor: '#A4B5FF', opacity: 0.35 }}
        />
        <div
          className="pointer-events-none absolute -top-[280px] -left-[280px] w-[600px] h-[600px] rounded-full border-[50px] z-0 hidden lg:block"
          style={{ borderColor: '#A4B5FF', opacity: 0.35 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <SectionTitle
            primary={t("title")}
            secondary={t("title1")}
            align="center"
          />

          {/* ============ MOBILE ============ */}
          <div className="mt-10 lg:hidden flex flex-col items-center">
            <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-[20px] overflow-hidden">
              <Image
                src="/home/events-image.png"
                alt="Events"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* ✅ ВОТ ТУТ СЛАЙДЕР или сообщение */}
            {upcomingEvents.length === 0 ? (
              <div className="text-center text-lg text-gray-500 mt-6">{t("empty")}</div>
            ) : (
              <MobileEventsSlider events={mobileSliderEvents} />
            )}

            <div className="mt-8">
              <Button variant="text" withArrow>
                {t("other")}
              </Button>
            </div>
          </div>

          {/* ============ DESKTOP ============ */}
          <div className="hidden lg:grid mt-12 grid-cols-[380px_1fr] gap-10 items-stretch">
            <div className="relative w-[380px] h-[600px] rounded-3xl overflow-hidden flex-shrink-0">
              <Image
                src="/home/events-image.png"
                alt="Events"
                fill
                className="object-cover"
                priority
              />
            </div>

            {upcomingEvents.length === 0 ? (
              <div className="flex items-center justify-center text-2xl text-gray-500">{t("empty")}</div>
            ) : (
              <EventsSchedule events={scheduleEvents} />
            )}
          </div>

          <div className="hidden lg:flex mt-10 justify-end">
            <Button variant="text" withArrow href={LINKS.events}>
              {t("other")}
            </Button>
          </div>
        </div>
        {/* Модалка регистрации */}
        {selectedEvent && (
          <EventRegistrationModal
            isOpen={isRegModalOpen}
            onClose={handleCloseRegModal}
            eventTitle={typeof selectedEvent.title === 'string' ? selectedEvent.title : (selectedEvent.title?.ru || '')}
            eventId={selectedEvent.id}
            events={upcomingEvents.map(ev => ({ id: ev.id, title: typeof ev.title === 'string' ? ev.title : (ev.title?.ru || '') }))}
          />
        )}
      </section>
    );
}
