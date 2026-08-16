import fs from "fs";
import path from "path";
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import PanelLayout from "@/components/PanelLayout";

interface ProjectDetail {
  slug: string;
  title: string;
  image: string;
  desc: string;
  skills: string[];
  github: string;
  link: string;
  content: string;
}

export default function ProjectPage({ project }: { project: ProjectDetail }) {
  return (
    <PanelLayout
      path={`projects/${project.slug}/`}
      title={project.title}
      terminalChrome
    >
      <Link
        href="/projects"
        className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-subtle)] hover:text-[var(--color-love)] transition-colors mb-6 inline-block"
      >
        &lt;- back to projects
      </Link>

      <h1 className="font-[family-name:var(--font-mono)] text-2xl md:text-3xl text-[var(--color-text)] mb-4">
        {project.title}
      </h1>

      {/* Skills + links */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {project.skills.filter(Boolean).map((skill) => (
          <span
            key={skill}
            className="font-[family-name:var(--font-mono)] text-xs px-2 py-0.5 rounded border border-[var(--color-overlay)] text-[var(--color-foam)]"
          >
            {skill}
          </span>
        ))}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-subtle)] hover:text-[var(--color-love)] transition-colors"
          >
            [github]
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-subtle)] hover:text-[var(--color-love)] transition-colors"
          >
            [link]
          </a>
        )}
      </div>

      {/* Featured image */}
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Markdown content */}
      <div className="prose prose-invert max-w-none text-[var(--color-text)] [&_a]:text-[var(--color-love)] [&_h1]:text-[var(--color-text)] [&_h2]:text-[var(--color-text)] [&_h3]:text-[var(--color-text)] [&_h1]:font-[family-name:var(--font-mono)] [&_h2]:font-[family-name:var(--font-mono)] [&_h3]:font-[family-name:var(--font-mono)] [&_code]:text-[var(--color-foam)] [&_code]:bg-[var(--color-overlay)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_strong]:text-[var(--color-text)] [&_blockquote]:border-[var(--color-iris)]">
        <Markdown
          remarkPlugins={[remarkGfm, remarkImages]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
        >
          {project.content}
        </Markdown>
      </div>
    </PanelLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "public", "projects.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  const paths = data.projects.map((p: { md: string }) => {
    const slug = p.md.split("/").slice(-2, -1)[0];
    return { params: { slug } };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = String(params?.slug);

  const projectsPath = path.join(process.cwd(), "public", "projects.json");
  const projectsRaw = fs.readFileSync(projectsPath, "utf-8");
  const projectsData = JSON.parse(projectsRaw);
  const meta = projectsData.projects.find((p: { md: string }) =>
    p.md.includes(`/${slug}/`),
  );

  const mdPath = path.join(
    process.cwd(),
    "public",
    "project",
    slug,
    "index.md",
  );
  let content = "";
  if (fs.existsSync(mdPath)) {
    content = fs.readFileSync(mdPath, "utf-8");
  }

  const project: ProjectDetail = {
    slug,
    title: meta?.title ?? slug,
    image: meta?.image ?? "",
    desc: meta?.desc ?? "",
    skills: meta?.skills ?? [],
    github: meta?.github ?? "",
    link: meta?.link ?? "",
    content,
  };

  return { props: { project } };
};
