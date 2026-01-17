import { ContentCard } from "@/components/ui/ContentCard";
import { projects } from "@/app/data/projects";
export function ProjectsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ContentCard
              key={project.slug}
              variant="project"
              image={project.cover}
              title={project.title}
              description={project.subtitle}
              href={`/projects/${project.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
