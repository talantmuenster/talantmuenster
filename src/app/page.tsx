
import Hero from '@/components/home/hero';
import HowWeHelp from '@/components/home/HowWeHelp';
import Programs from '@/components/home/Programs';
import { Subscribe } from '@/components/home/Subscribe';
import UpcomingEventsLoader from '@/components/home/upcoming-events/UpcomingEventsLoader.client';
import WhyChoose from '@/components/home/WhyChoose';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />  
        <Programs />
        <WhyChoose/>
        <HowWeHelp />
        <UpcomingEventsLoader />
        <Subscribe />
        {/* Здесь будут другие секции */}
      </main>
    </div>
  );
}