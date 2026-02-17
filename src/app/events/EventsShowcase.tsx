'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../../components/ui/Button';
import { EventRegistrationModal } from '../../components/events/EventRegistrationModal';
import { useLocale, useTranslations } from 'next-intl';

type EventItem = {
  id: string;
  date: string;
  day: string;
  time: string;
  startTime: string;
  endTime: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  fullDescription?: string;
};

const fallbackEvents: EventItem[] = [
  {
    id: '1',
    date: '12.11',
    day: 'Четверг',
    time: '16:00 – 18:00',
    startTime: '16:00',
    endTime: '18:00',
    title: 'Мысли об искусстве',
    subtitle: 'Лекция о русской живописи 18 века',
    image:
      'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=900&h=600&fit=crop',
    description:
      'Открытая лекция о влиянии русской живописи на европейское искусство...',
    fullDescription:
      'Открытое для себя магию русской живописи – от ярких полотен Айвазовского до душевных пейзажей Левитана, которые трогают сердца и протяжении веков. Эта лекция поможет вам не только лучше понять творчество великих художников, но и узнать о малоизвестных фактах их жизни, влиянии обществ и временах на их шедевры.',
  },
];

export default function EventsShowcase() {
  const [events, setEvents] = useState<EventItem[]>(fallbackEvents);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/admin/events');
        if (res.ok) {
          const data = await res.json();
          const published = (data || [])
            .filter((e: any) => e.published)
            .map((e: any) => {
              const eventDate = new Date(e.date);
              const day = eventDate.getDate().toString().padStart(2, '0');
              const month = (eventDate.getMonth() + 1).toString().padStart(2, '0');
              const weekday = eventDate.toLocaleDateString(locale, { weekday: 'long' });
              
              return {
                id: e.id,
                date: `${day}.${month}`,
                day: weekday.charAt(0).toUpperCase() + weekday.slice(1),
                time: `${e.startTime || ''} – ${e.endTime || ''}`,
                startTime: e.startTime || '',
                endTime: e.endTime || '',
                title: typeof e.title === 'string' ? e.title : (e.title?.ru || ''),
                subtitle: typeof e.subtitle === 'string' ? e.subtitle : (e.subtitle?.ru || ''),
                image: e.image || e.cover || 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=900&h=600&fit=crop',
                description: typeof e.description === 'string' ? e.description : (e.description?.ru || ''),
                fullDescription: typeof e.content === 'string' ? e.content : (e.content?.ru || (typeof e.description === 'string' ? e.description : (e.description?.ru || ''))),
              };
            });
          
          if (published.length > 0) {
            setEvents(published);
          }
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const active = events[activeIndex];

  const handleSelectEvent = (index: number) => {
    setActiveIndex(index);
    setIsMobileModalOpen(true);
  };

  const handleOpenRegistration = () => {
    setIsRegistrationModalOpen(true);
    setIsMobileModalOpen(false);
  };

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT LIST */}
        <div className="flex flex-col gap-4">
          {events.map((event, index) => {
            const date = new Date(event.date);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const weekday = date.toLocaleDateString(locale, { weekday: 'long' });
 
            return ( 
              <button 
                key={event.id} 
                onClick={() => handleSelectEvent(index)}
                className={`
                  bg-white border border-gray-200 rounded-lg p-4 flex gap-6 items-stretch text-left transition
                  ${
                    index === activeIndex
                      ? ' bg-[#EBEFFF61]'
                      : 'border border-gray-700 hover:bg-[#EBEFFF61]'
                  }
                `}
              >
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
                  <div className="text-lgg text-text-gray-700">
                    {event.startTime} – {event.endTime}
                  </div>

                  <div className="font-medium text-heading-mdd mt-2 mb-2 text-primary">
                    {event.title}
                  </div>

                  <div className="text-sm text-text-gray-700 mb-4">
                    {event.description}
                  </div>
                  <Button
                    variant="text"
                    withArrow
                    size="sm"
                    className="pl-0"
                  >
                    {t("home.upcomingEvents.other1")}
                  </Button>
                </div>
              </button>
            );
          })}
        </div>


        {/* RIGHT DETAILS */}
        {active && (
          <div className="space-y-6 hidden lg:block">
            {/* Image */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
              <Image
                src={active.image}
                alt={active.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Title and Meta */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">
                {active.title}
              </h2>
              <div className="text-gray-600 mb-4">
                {active.day}, {active.date} • {active.time}
              </div>
              <p className="text-gray-900 leading-relaxed">
                {active.fullDescription || active.description}
              </p>
            </div>

            {/* Registration Button */}
            <div>
              <Button
                size="md"
                variant="primary"
                disabled={!active.startTime}
                onClick={handleOpenRegistration}
              >
                {t("home.upcomingEvents.registration")}
              </Button>
            </div>
          </div>
        )}
      </div>

      {active && isMobileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 lg:hidden">
          <div className="w-full max-w-lg bg-white rounded-xl overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div className="text-sm font-semibold text-gray-700">
                Мероприятие
              </div>
              <button
                onClick={() => setIsMobileModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full h-[300px]">
              <Image
                src={active.image}
                alt={active.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="p-5 space-y-3">
              <h2 className="text-3xl font-semibold text-primary ">
                {active.title}
              </h2>
              <div className="text-sm text-gray-600 mb-3">
                {active.day}, {active.date} • {active.time}
              </div>
              <p className="text-sm text-gray-700  py-3 leading-relaxed">
                {active.fullDescription || active.description}
              </p>
              <Button
                size="sm"
                variant="primary"
                disabled={!active.startTime}
                className="w-full text-center justify-center"
                onClick={handleOpenRegistration}
              >
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* REGISTRATION MODAL */}
      <EventRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        eventTitle={active.title}
        eventId={active.id}
        events={events.map(e => ({ id: e.id, title: e.title }))}
      />
    </section>
  );
}
