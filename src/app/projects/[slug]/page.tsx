"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";

import { HeroSection } from "@/components/main/HeroSection";
import { Subscribe } from "@/components/home/Subscribe";
import type { Project as AdminProject, LocalizedContent } from "@/admin/types";

type ProjectItem = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  content: string;
};

const getText = (content: LocalizedContent, locale: string) =>
  content?.[locale as keyof LocalizedContent] || content?.ru || "";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "");

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const [items, setItems] = useState<AdminProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/admin/projects", { credentials: "include" });
        if (!res.ok) return;
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch {
        setItems([]);
      }
    };

    fetchProjects();
  }, []);

  const projects = useMemo<ProjectItem[]>(
    () =>
      items
        .filter((item) => item.published)
        .map((item) => ({
          id: item.id || "",
          image: item.imageUrl 
            ? `/api/proxy-image?url=${encodeURIComponent(item.imageUrl)}`
            : '/placeholder-image.png',
          title: getText(item.title, locale),
          subtitle: getText(item.description, locale),
          content: getText(item.content, locale),
        }))
        .filter((item) => item.id),
    [items, locale]
  );

  const project = projects.find(
    (item) => item.id === slug || slugify(item.title) === slug
  );

  if (!project) {
    return <div className="py-20 text-center">Проект не найден</div>;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <HeroSection
            breadcrumbs={[
              { label: "Главная", href: "/" },
              { label: "Проекты", href: "/projects" },
              { label: project.title },
            ]}
            title={project.title}
            subtitle={project.subtitle}
          />

          <article className="pb-20">
            {/* FULL-WIDTH IMAGE */}
            <div className="w-full px-4 mb-12">
              <div className="relative max-w-6xl mx-auto aspect-[16/9] rounded-3xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
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
                    {project.content}
                  </p>
                </div>
              </div>
            </div>

            <Subscribe />
          </article>
        </main>
      </div>
    </>
  );
}
