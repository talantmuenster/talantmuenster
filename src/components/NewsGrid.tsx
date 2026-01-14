import { ContentCard } from "./ui/ContentCard";

type NewsItem = {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  href: string;
};

type Props = {
  news: NewsItem[];
};

export function NewsGrid({ news }: Props) {
  if (!news.length) return null;

  return (
    <section className="mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* 🔥 ВЕРХНИЙ БЛОК */}
        <div className="grid grid-cols-3 gap-6 auto-rows-[280px] mb-12">
          <ContentCard {...news[0]} featured />

          {news[1] && <ContentCard {...news[1]} />}
          {news[2] && <ContentCard {...news[2]} />}
        </div>

        {/* 🔽 ОСНОВНАЯ СЕТКА */}
        <div className="grid grid-cols-4 gap-6 auto-rows-[280px]">
          {news.slice(3).map((item) => (
            <ContentCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
