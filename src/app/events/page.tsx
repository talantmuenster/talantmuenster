import React from 'react'
import { HeroSection } from "@/components/main/HeroSection";
import { Container } from "@/components/ui/Container";
import { Subscribe } from "@/components/home/Subscribe";
import { useTranslations } from 'next-intl';
import EventsShowcase from './EventsShowcase';
// import { useTranslations } from "next-intl";


export default function Eventspage() {
	  const t = useTranslations("events");
  return (
	<>
	 <HeroSection
			breadcrumbs={[
			  { label: t("breadcrumbs.home"), href: "/" },
			  { label: t("breadcrumbs.events") },
			]}
			title={
			  <>
				{t("hero.title.before")}{" "}
			  </>
			}
			subtitle={t("hero.subtitle")}
			backgroundImage="/about/bg-hero.png"
		  />
		 <EventsShowcase/>			
		  <Subscribe />
	</>
  )
}
