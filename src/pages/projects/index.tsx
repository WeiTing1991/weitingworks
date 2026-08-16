import fs from "fs";
import path from "path";
import { useEffect, useRef } from "react";
import type { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import PanelLayout from "@/components/PanelLayout";

interface Project {
  title: string;
  image: string;
  md: string;
  desc: string;
  skills: string[];
  github: string;
  link: string;
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function Projects({ projects }: { projects: (Project & { slug: string })[] }) {
  const gridRef = useScrollReveal();

  return (
    <PanelLayout path="projects/" title="Projects" terminalChrome>
      <h1 className="font-[family-name:var(--font-mono)] text-2xl md:text-3xl text-[var(--color-text)] mb-8">
        Projects
      </h1>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            data-reveal
            className="group rounded-lg border border-[var(--color-overlay)] bg-[var(--color-base)] overflow-hidden hover:border-[var(--color-iris)] transition-all hover:shadow-md hover:shadow-[var(--color-shadow)] opacity-0 translate-y-6 [&.revealed]:opacity-100 [&.revealed]:translate-y-0"
            style={{ transitionDuration: "0.5s", transitionDelay: `${index * 0.07}s` }}
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-[var(--color-base)] opacity-30 group-hover:opacity-0 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className="font-[family-name:var(--font-mono)] text-base text-[var(--color-text)] group-hover:text-[var(--color-love)] transition-colors mb-2">
                {project.title}
              </h2>
              <p className="text-sm text-[var(--color-subtle)] line-clamp-2 mb-3 leading-relaxed">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.skills.filter(Boolean).map((skill) => (
                  <span
                    key={skill}
                    className="font-[family-name:var(--font-mono)] text-xs px-2 py-0.5 rounded bg-[var(--color-overlay)] text-[var(--color-foam)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PanelLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), "public", "projects.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  const projects = data.projects.map((p: Project) => {
    const slug = p.md.split("/").slice(-2, -1)[0];
    return { ...p, slug };
  });

  return { props: { projects } };
};
