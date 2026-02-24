"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { HeroSection } from "@/components/main/HeroSection";
import { Subscribe } from "@/components/home/Subscribe";
import { ContentCard } from "@/components/ui/ContentCard";
import { Container } from "@/components/ui/Container";
import Pagination from "@/components/ui/Pagination";
import type { News as AdminNews, LocalizedContent } from "@/admin/types";

type NewsItem = {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  href: string;
};

const getText = (content: LocalizedContent, locale: string) =>
  content?.[locale as keyof LocalizedContent] || content?.ru || "";

export default function Project() {
  const t = useTranslations("news");
  const locale = useLocale();
  const [items, setItems] = useState<AdminNews[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/admin/news", { credentials: "include" });
        if (!res.ok) return;
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch {
        setItems([]);
      }
    };

    fetchNews();
  }, []);

  const news = useMemo<NewsItem[]>(
    () =>
      items
        .filter((item) => item.published)
        .map((item) => ({
          id: item.id || "",
          image: item.imageUrl 
            ? `/api/proxy-image?url=${encodeURIComponent(item.imageUrl)}`
            : '/placeholder-image.png',
          title: getText(item.title, locale),
          description: getText(item.excerpt, locale),
          date: item.date,
          href: `/news/${item.id}`,
        }))
        .filter((item) => item.id),
    [items, locale]
  );

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
    page * ITEMS_PER_PAGE
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
            {staticNews[0] && (
              <ContentCard
                {...staticNews[0]}
                featured
                className="lg:col-span-2"
              />
            )}
            {staticNews[1] && <ContentCard {...staticNews[1]} />}
            {staticNews[2] && <ContentCard {...staticNews[2]} />}
          </div>

          {/* 🔽 BOTTOM GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedNews.map((item) => (
              <ContentCard key={item.id} {...item} />
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
