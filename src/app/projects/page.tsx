import { useTranslations } from "next-intl";
import React from "react";
import { HeroSection } from "@/components/main/HeroSection";
import { ProjectsSection } from "./ProjectsSection";
import { Subscribe } from "@/components/home/Subscribe";

export default function Project() {
  const t = useTranslations("project");
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection
          breadcrumbs={[
            { label: t("breadcrumbs.home"), href: "/" },
            { label: t("breadcrumbs.project") },
          ]}
          title={
            <>
              {t("hero.title.before")}{" "}
              <span className="text-[#E07A2F]">
                {t("hero.title.highlight")}
              </span>{" "}
            </>
          }
          subtitle={<>{t("hero.subtitle")}</>}
          backgroundImage="/about/bg-hero.png"
        />
        <ProjectsSection />
        <Subscribe />
      </main>
    </div>
  );
}
