"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { HeroSection } from "../../../../components/main/HeroSection";
import { ImageTextSection } from "../../../../components/main/ImageTextSection";
import { TeamSection } from "../../../../components/about/TeamSection";
import FqaSection from "../../../../components/about/fqasection";
import { FinalCTA } from "../../../../components/about/FinalCTA";

export default function About() {
  const t = useTranslations("about");

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

        <TeamSection
          members={[
            {
              name: "Анна Фёдорова",
              role: t("team.role.music"),
              image: "/team/anna-1.png",
            },
            {
              name: "Анна Фёдорова",
              role: t("team.role.music"),
              image: "/team/anna-2.png",
            },
            {
              name: "Анна Фёдорова",
              role: t("team.role.music"),
              image: "/team/anna-3.png",
            },
            {
              name: "Анна Фёдорова",
              role: t("team.role.music"),
              image: "/team/anna-4.png",
            },
          ]}
        />

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
