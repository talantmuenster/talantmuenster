'use client';
import { SectionTitle } from '../../../components/ui/Sectiontitle';
import ImageSlider  from './OverlapSlider';


export function SliderAbout() {
  return (
	<section className="relative bg-background-blue py-20 lg:overflow-hidden">
	  {/* ARCS */}
	  <div className="pointer-events-none absolute -top-[320px] -left-[320px]
		w-[750px] h-[750px] rounded-full border-[50px] z-0 hidden lg:block"
		style={{ borderColor: '#A4B5FF', opacity: 0.35 }}
	  />
	  <div className="pointer-events-none absolute -top-[280px] -left-[280px]
		w-[600px] h-[600px] rounded-full border-[50px] z-0 hidden lg:block"
		style={{ borderColor: '#A4B5FF', opacity: 0.35 }}
	  />

	  <div className="relative z-10 max-w-7xl mx-auto px-4">
		  <SectionTitle primary="Наши программы направлены на образование, творческое развитие и" secondary="поддержку детей, подростков и семей в межкультурной среде" className="mb-8 text-center text-heading-xl" />
		  <ImageSlider />
	  </div>
	</section>
  );
}
