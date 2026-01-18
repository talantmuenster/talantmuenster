'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Button } from '@/components/ui/Button';
import type { CalendarEvent } from '@/type/type';

type Props = {
  events: CalendarEvent[];
};

export default function MobileEventsSlider({ events }: Props) {
  return (
    <div className="mt-6 w-full">
      <Swiper
        slidesPerView={1.1}
        spaceBetween={16}
        loop={false}
        onSwiper={() => console.log('SWIPER INIT')}
      >
        {events.map(event => (
          <SwiperSlide key={event.id}>
            <MobileEventCard event={event} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function MobileEventCard({ event }: { event: CalendarEvent }) {
  const date = new Date(event.date);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const weekday = date.toLocaleDateString('ru-RU', { weekday: 'long' });

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="bg-primary-light/20 rounded-xl p-4 text-center mb-3">
        <div className="text-xl font-heading text-primary">
          {day}.{month}
        </div>
        <div className="text-sm text-primary capitalize">
          {weekday}
        </div>
      </div>

      <div className="text-sm text-text-secondary mb-1">
        {event.startTime} – {event.endTime}
      </div>

      <div className="font-medium text-primary mb-1">
        {event.title}
      </div>

      <div className="text-sm text-text-secondary mb-3">
        {event.description}
      </div>

      <button className="text-sm text-primary hover:text-accent transition mb-3">
        Подробнее →
      </button>

      {event.registrationUrl && (
        <Button size="sm" className="w-full">
          Регистрация
        </Button>
      )}
    </div>
  );
}
