"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { HeroSection } from "@/components/main/HeroSection";
import { ImageTextSection } from "@/components/main/ImageTextSection";
import { TeamSection } from "@/components/about/TeamSection";
import FqaSection from "@/components/about/fqasection";
import { FinalCTA } from "@/components/about/FinalCTA";

export default function About() {
  const t = useTranslations("about");
  type TeamMember = {
    name: { ru: string; en: string; de: string };
    role: { ru: string; en: string; de: string };
    image: string;
    skills?: string[];
  };
  const fallbackMembers = useMemo(
    (): TeamMember[] => [
      {
        name: { ru: 'Анна Фёдорова', en: 'Anna Fedorova', de: 'Anna Fedorowa' },
        role: { ru: t("team.role.music"), en: "Music Teacher", de: "Musiklehrerin" },
        image: "/team/anna-1.png",
        skills: ['Музыка', 'Вокал'],
      },
      {
        name: { ru: 'Анна Фёдорова', en: 'Anna Fedorova', de: 'Anna Fedorowa' },
        role: { ru: t("team.role.music"), en: "Music Teacher", de: "Musiklehrerin" },
        image: "/team/anna-2.png",
        skills: ['Композиция'],
      },
      {
        name: { ru: 'Анна Фёдорова', en: 'Anna Fedorova', de: 'Anna Fedorowa' },
        role: { ru: t("team.role.music"), en: "Music Teacher", de: "Musiklehrerin" },
        image: "/team/anna-3.png",
        skills: ['Пианино', 'Теория'],
      },
      {
        name: { ru: 'Анна Фёдорова', en: 'Anna Fedorova', de: 'Anna Fedorowa' },
        role: { ru: t("team.role.music"), en: "Music Teacher", de: "Musiklehrerin" },
        image: "/team/anna-4.png",
        skills: ['Скрипка'],
      },
    ],
    [t]
  );
  const [remoteTeam, setRemoteTeam] = useState<TeamMember[] | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/team");
        if (!res.ok) return;
        
        const data = await res.json();
        
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data
            .filter((member: unknown): member is Record<string, unknown> =>
              typeof member === "object" && member !== null
            )
            .map((member) => {
              const name = typeof member.name === "object" && member.name 
                ? member.name 
                : { ru: '', en: '', de: '' };
              const role = typeof member.role === "object" && member.role 
                ? member.role 
                : { ru: '', en: '', de: '' };
              return {
                name,
                role,
                image: typeof member.image === "string" ? member.image : "",
                skills: Array.isArray(member.skills) ? member.skills : [],
              };
            });

          if (mapped.length > 0) {
            setRemoteTeam(mapped);
          }
        }
      } catch {
        // fallback stays in place
      }
    };

    fetchTeam();
  }, []);

  const teamMembers = remoteTeam ?? fallbackMembers;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection
          breadcrumbs={[
            { label: t("breadcrumbs.home"), href: "/" },
            { label: t("breadcrumbs.about") },
          ]}
          title={
            <>
              {t("hero.title.before")}{" "}
              <span className="text-[#E07A2F]">
                {t("hero.title.highlight")}
              </span>{" "}
              {t("hero.title.after")}
            </>
          }
          subtitle={<>{t("hero.subtitle")}</>}
          backgroundImage="/about/bg-hero.png"
        />

        <ImageTextSection
          imageSrc="/about/international1.png"
          title={
            <>
              {t("programs.title.before")}{" "}
              <span className="text-primary-light">
                {t("programs.title.highlight")}
              </span>
            </>
          }
          text={<>{t("programs.text")}</>}
          stats={[
            { value: 10, label: t("programs.stats.directions") },
            { value: 42, label: t("programs.stats.courses") },
            { value: 500, label: t("programs.stats.students") },
          ]}
        />

        <ImageTextSection
          reverse
          imageSrc="/about/international2.png"
          title={
            <>
              <span className="text-primary-light">
                {t("cooperation.title.highlight")}
              </span>{" "}
              {t("cooperation.title.after")}
            </>
          }
          text={<>{t("cooperation.text")}</>}
        />

        <ImageTextSection
          imageSrc="/about/international3.png"
          title={
            <>
              {t("project.title.before")}{" "}
              <span className="text-primary-light">
                {t("project.title.highlight")}
              </span>
            </>
          }
          text={<>{t("project.text")}</>}
        />

        {teamMembers.length > 0 && <TeamSection members={teamMembers} />}

        <FqaSection />

        <FinalCTA
          title={t("cta.title")}
          subtitle={t("cta.subtitle")}
          buttonText={t("cta.button")}
        />
      </main>
    </div>
  );
}
