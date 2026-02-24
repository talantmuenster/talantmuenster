"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { ContentCard } from "@/components/ui/ContentCard";
import type { Project as AdminProject, LocalizedContent } from "@/admin/types";

const getText = (content: LocalizedContent, locale: string) =>
  content?.[locale as keyof LocalizedContent] || content?.ru || "";

export function ProjectsSection() {
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

  const projects = useMemo(
    () => items.filter((item) => item.published),
    [items]
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ContentCard
              key={project.id}
              variant="project"
              image={project.imageUrl 
                ? `/api/proxy-image?url=${encodeURIComponent(project.imageUrl)}`
                : '/placeholder-image.png'}
              title={getText(project.title, locale)}
              description={getText(project.description, locale)}
              href={`/projects/${project.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
