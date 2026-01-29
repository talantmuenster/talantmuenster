import Image from "next/image";
import { HeroSection } from "@/components/main/HeroSection";
import { newss } from "@/data/news";
import { Subscribe } from "@/components/home/Subscribe";
import { Container } from "@/components/ui/Container";
import RelatedNews from "@/components/RelatedNews";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function NewsPage({ params }: Props) {
  const { slug } = await params;

  const news = newss.find((p) => p.slug === slug);

  if (!news) {
    return <div className="py-20 text-center">Проект не найден</div>;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <HeroSection
            breadcrumbs={[
              { label: "Главная", href: "/" },
              { label: "Новости", href: "/news" },
              { label: news.title },
            ]}
            title={news.title}
            subtitle={news.subtitle}
          />

          <article className="pb-20">
            {/* FULL-WIDTH IMAGE */}
            <div className="w-full px-4 mb-12">
              <div className="relative max-w-6xl mx-auto aspect-[16/9] rounded-3xl overflow-hidden">
                <Image
                  src={news.cover}
                  alt={news.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-3xl mx-auto px-4">
              <div className="space-y-10">
                {news.content.map((block, i) => (
                  <div key={i}>
                    {block.title && (
                      <h2 className="text-xl font-semibold mb-3">
                        {block.title}
                      </h2>
                    )}
                    <p className="text-gray-700 leading-relaxed">
                      {block.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Container>
              <RelatedNews currentSlug={slug} news={newss} />
            </Container>
            <Subscribe />
          </article>
        </main>
      </div>
    </>
  );
}
