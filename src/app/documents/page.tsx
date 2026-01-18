// app/documents/page.tsx
import { HeroSection } from "@/components/main/HeroSection";
import { Container } from "@/components/ui/Container";
import { Subscribe } from "@/components/home/Subscribe";
import { DocumentsSection } from "./DocumentsSection.client";
import { useTranslations } from "next-intl";

export default function DocumentPage() {
  const t = useTranslations("document");

  return (
    <>
      <HeroSection
        breadcrumbs={[
          { label: t("breadcrumbs.home"), href: "/" },
          { label: t("breadcrumbs.documents") },
        ]}
        title={
          <>
            {t("hero.title.before")}{" "}
            <span className="text-[#E07A2F]">{t("hero.title.highlight")}</span>
          </>
        }
        subtitle={t("hero.subtitle")}
        backgroundImage="/about/bg-hero.png"
      />

      <Container>
        <DocumentsSection />
      </Container>

      <Subscribe />
    </>
  );
}
