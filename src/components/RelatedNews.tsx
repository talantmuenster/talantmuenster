"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { ContentCard } from "@/components/ui/ContentCard";

type RelatedNewsItem = {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  href: string;
};

type Props = {
  currentId: string;
  news: RelatedNewsItem[];
};

export default function RelatedNews({ currentId, news }: Props) {
  const related = news.filter((item) => item.id !== currentId).slice(0, 8);

  if (related.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-semibold mb-8 text-left md:text-center ">
        Читайте <span className="text-primary-light">также</span>
      </h2>

      {/* ================= MOBILE SLIDER ================= */}
      <div className="md:hidden -mx-4 px-4">
        <Swiper spaceBetween={16} slidesPerView={1.15}>
          {related.map((item) => (
            <SwiperSlide key={item.id}>
              <ContentCard
                title={item.title}
                description={item.description}
                image={item.image}
                date={item.date}
                href={item.href}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= DESKTOP GRID ================= */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((item) => (
          <ContentCard
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            date={item.date}
            href={item.href}
          />
        ))}
      </div>
    </section>
  );
}
