import Image from "next/image";
import { HeroSection } from "@/components/main/HeroSection";
import { projects } from "@/data/projects";
import { Subscribe } from "@/components/home/Subscribe";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const t = getTranslations("projects");
  const { slug } = await params;

  const project = projects.find((p) => Object.values(p.slug).includes(slug));

  if (!project) {
    return <div className="py-20 text-center">Проект не найден</div>;
  }

  const getTitle = (content: any) => typeof content === "string" ? content : content?.ru || "";
  const getSubtitle = (content: any) => typeof content === "string" ? content : content?.ru || "";

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <HeroSection
            breadcrumbs={[
              { label: "Главная", href: "/" },
              { label: "Проекты", href: "/projects" },
              { label: getTitle(project.title) },
            ]}
            title={getTitle(project.title)}
            subtitle={getSubtitle(project.subtitle)}
          />

          <article className="pb-20">
            {/* FULL-WIDTH IMAGE */}
            <div className="w-full px-4 mb-12">
              <div className="relative max-w-6xl mx-auto aspect-[16/9] rounded-3xl overflow-hidden">
                <Image
                  src={project.cover}
                  alt={getTitle(project.title)}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-3xl mx-auto px-4">
              <div className="space-y-10">
                {project.content.map((block, i) => (
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

            <Subscribe />
          </article>
        </main>
      </div>
    </>
  );
}
