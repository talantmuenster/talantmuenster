
import Hero from '@/components/home/hero';
import HowWeHelp from '@/components/home/HowWeHelp';
import Programs from '@/components/home/Programs';
import { Subscribe } from '@/components/home/Subscribe';
import { UpcomingEvents } from '@/components/home/upcoming-events/UpcomingEvents';
import WhyChoose from '@/components/home/WhyChoose';
import { CalendarEvent } from '@/type/type';
const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Мысли об искусстве',
    description: 'Лекция о русской живописи 18 века',
    date: '2024-11-12',
    startTime: '16:00',
    endTime: '18:00',
    registrationUrl: '#',
  },
  {
    id: '2',
    title: 'Мысли об искусстве',
    description: 'Лекция о русской живописи 18 века',
    date: '2024-11-12',
    startTime: '16:00',
    endTime: '18:00',
    registrationUrl: '#',
  },
  {
    id: '3',
    title: 'Мысли об искусстве',
    description: 'Лекция о русской живописи 18 века',
    date: '2024-11-12',
    startTime: '16:00',
    endTime: '18:00',
    registrationUrl: '#',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <Programs />
        <WhyChoose/>
        <HowWeHelp />
        <UpcomingEvents CalendarEvent={events} />
        <Subscribe />
        {/* Здесь будут другие секции */}
      </main>
    </div>
  );
}