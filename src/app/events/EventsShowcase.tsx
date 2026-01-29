'use client';

import { useState } from 'react';

type EventItem = {
  id: number;
  date: string;
  day: string;
  time: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
};

const events: EventItem[] = [
  {
    id: 1,
    date: '12.11',
    day: 'Четверг',
    time: '16:00 – 18:00',
    title: 'Мысли об искусстве',
    subtitle: 'Лекция о русской живописи 18 века',
    image:
      'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=900&h=600&fit=crop',
    description:
      'Открытая лекция о влиянии русской живописи на европейское искусство...',
  },
  {
    id: 2,
    date: '13.11',
    day: 'Пятница',
    time: '17:00 – 19:00',
    title: 'Форма и цвет',
    subtitle: 'Современное искусство',
    image:
      'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=900&h=600&fit=crop',
    description:
      'Разбор ключевых направлений современного визуального искусства...',
  },
  {
    id: 3,
    date: '14.11',
    day: 'Суббота',
    time: '15:00 – 17:00',
    title: 'Абстракция',
    subtitle: 'От Кандинского до наших дней',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=600&fit=crop',
    description:
      'Как абстрактное искусство изменило визуальное мышление...',
  },
];

export default function EventsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = events[activeIndex];

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12">
        {/* LEFT LIST */}
        <div className="space-y-4">
          {events.map((event, index) => (
            <button
              key={event.id}
              onClick={() => setActiveIndex(index)}
              className={`
                w-full text-left rounded-xl border p-4 transition
                ${
                  index === activeIndex
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex gap-4">
                <div className="text-center min-w-[64px]">
                  <div className="text-lg font-semibold text-blue-600">
                    {event.date}
                  </div>
                  <div className="text-xs text-gray-500">
                    {event.day}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">
                    {event.time}
                  </div>
                  <div className="font-medium">
                    {event.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {event.subtitle}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* RIGHT CARD */}
        <div className="relative">
          <div
            key={active.id}
            className="
              rounded-3xl overflow-hidden bg-white
              shadow-xl transition-all duration-500
            "
          >
            <div className="h-[300px] overflow-hidden">
              <img
                src={active.image}
                alt={active.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                {active.title}
              </h3>

              <div className="text-sm text-gray-500 mb-4">
                {active.day}, {active.date} · {active.time}
              </div>

              <p className="text-gray-600 mb-6">
                {active.description}
              </p>

              <button className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
                Регистрация
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
