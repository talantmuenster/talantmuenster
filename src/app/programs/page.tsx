import { useTranslations } from 'next-intl';
import React from 'react'
import { HeroSection } from '@/components/main/HeroSection';
import { Container } from '@/components/ui/Container';
import { DirectionSelector } from '@/components/DirectionSelector/DirectionSelector';
import { SectionTitle } from '@/components/ui/Sectiontitle';
import { SliderAbout } from './components/sliderabout';
import HowToParticipate from './components/HowToParticipate';

export default function Programs() {
    const t = useTranslations("courses"); 
  
	return (
		<div className="min-h-screen flex flex-col">
		  <main className="flex-1">
			<HeroSection
			  breadcrumbs={[
				{ label: t("breadcrumbs.home"), href: "/" },
				{ label: t("breadcrumbs.programs") },
			  ]}
			  title={<>{t("hero.title.before")}</>}
			  subtitle={<>{t("hero.subtitle")}</>}
			  backgroundImage="/home/bg-hero.png"
			/>
			<Container>
			  <SectionTitle primary="Выберите" secondary="направление" className="mb-8 text-center" />
			  <DirectionSelector />
			</Container>
			<SliderAbout />
			<HowToParticipate/>
		  </main>
		</div>	
	
  )
}
