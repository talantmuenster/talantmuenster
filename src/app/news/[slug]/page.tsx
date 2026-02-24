"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";

import { HeroSection } from "@/components/main/HeroSection";
import { Subscribe } from "@/components/home/Subscribe";
import { Container } from "@/components/ui/Container";
import RelatedNews from "@/components/RelatedNews";
import type { News as AdminNews, LocalizedContent } from "@/admin/types";

type NewsItem = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
  href: string;
};

const getText = (content: LocalizedContent, locale: string) =>
  content?.[locale as keyof LocalizedContent] || content?.ru || "";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "");

export default function NewsPage() {
  const { slug } = useParams<{ slug: string }>();
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

  const newsList = useMemo<NewsItem[]>(
    () =>
      items
        .filter((item) => item.published)
        .map((item) => ({
          id: item.id || "",
          image: item.imageUrl 
            ? `/api/proxy-image?url=${encodeURIComponent(item.imageUrl)}`
            : '/placeholder-image.png',
          title: getText(item.title, locale),
          subtitle: getText(item.excerpt, locale),
          content: getText(item.content, locale),
          date: item.date,
          href: `/news/${item.id}`,
        }))
        .filter((item) => item.id),
    [items, locale]
  );

  const active = newsList.find(
    (item) => item.id === slug || slugify(item.title) === slug
  );

  if (!active) {
    return <div className="py-20 text-center">Новость не найдена</div>;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <HeroSection
            breadcrumbs={[
              { label: "Главная", href: "/" },
              { label: "Новости", href: "/news" },
              { label: active.title },
            ]}
            title={active.title}
            subtitle={active.subtitle}
          />

          <article className="pb-20">
            {/* FULL-WIDTH IMAGE */}
            <div className="w-full px-4 mb-12">
              <div className="relative max-w-6xl mx-auto aspect-[16/9] rounded-3xl overflow-hidden">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-3xl mx-auto px-4">
              <div className="space-y-10">
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    {active.content}
                  </p>
                </div>
              </div>
            </div>

            <Container>
              <RelatedNews currentId={active.id} news={newsList} />
            </Container>

            <Subscribe />
          </article>
        </main>
      </div>
    </>
  );
}
