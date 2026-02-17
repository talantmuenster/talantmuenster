'use client';

import { useEffect, useState } from 'react';
import { CalendarEvent } from '@/type/type';
import { UpcomingEvents } from './UpcomingEvents';

const fallbackEvents: CalendarEvent[] = [
  {
    id: '1',
    title: { ru: 'Мысли об искусстве', en: 'Thoughts on Art', de: 'Gedanken über Kunst' },
    description: { ru: 'Лекция о русской живописи 18 века', en: 'Lecture on Russian painting of the 18th century', de: 'Vortrag über russische Malerei des 18. Jahrhunderts' },
    date: '2024-11-12',
    startTime: '16:00',
    endTime: '18:00',
    registrationUrl: '#',
    createdAt: '',
    updatedAt: '',
  },
];

export default function UpcomingEventsLoader() {
  const [events, setEvents] = useState<CalendarEvent[]>(fallbackEvents);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/admin/events');
        if (res.ok) {
          const data = await res.json();
          const published = (data || [])
            .filter((e: any) => e.published)
            .slice(0, 6)
            .map((e: any) => ({
              id: e.id,
              title: typeof e.title === 'string' ? e.title : (e.title?.ru || ''),
              description: typeof e.description === 'string' ? e.description : (e.description?.ru || ''),
              date: e.date,
              startTime: e.startTime || '',
              endTime: e.endTime || '',
              registrationUrl: e.registrationUrl || '#',
              createdAt: e.createdAt || '',
              updatedAt: e.updatedAt || '',
            }));
          
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

  return <UpcomingEvents CalendarEvent={events} />;
}
