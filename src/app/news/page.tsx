"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { HeroSection } from "@/components/main/HeroSection";
import { Subscribe } from "@/components/home/Subscribe";
import { ContentCard } from "@/components/ui/ContentCard";
import { Container } from "@/components/ui/Container";
import Pagination from "@/components/ui/Pagination";
import { newss } from "@/app/data/news";
export default function Project() {
  const t = useTranslations("news");

  const news = newss;

  /* ================= PAGINATION LOGIC ================= */

  const ITEMS_PER_PAGE = 8;

  // первые 3 — всегда сверху
  const staticNews = news.slice(0, 3);

  // всё остальное — с пагинацией
  const paginatedSource = news.slice(3);

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(paginatedSource.length / ITEMS_PER_PAGE);

  const paginatedNews = paginatedSource.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  /* =================================================== */

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection
          breadcrumbs={[
            { label: t("breadcrumbs.home"), href: "/" },
            { label: t("breadcrumbs.news") },
          ]}
          title={<>{t("hero.title.before")}</>}
          subtitle={<>{t("hero.subtitle")}</>}
          backgroundImage="/home/bg-hero.png"
        />

        <Container>
          {/* 🔝 TOP GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <ContentCard
              {...staticNews[0]}
              featured
              className="lg:col-span-2"
            />
            <ContentCard {...staticNews[1]} />
            <ContentCard {...staticNews[2]} />
          </div>

          {/* 🔽 BOTTOM GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedNews.map((item) => (
              <ContentCard key={item.slug} {...item} />
            ))}
          </div>

          {/* 📄 PAGINATION */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </Container>

        <Subscribe />
      </main>
    </div>
  );
}
