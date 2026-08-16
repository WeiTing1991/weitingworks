import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import type { GetStaticProps } from "next";
import PanelLayout from "@/components/PanelLayout";

type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
};

export default function BlogIndex({ posts }: { posts: PostMeta[] }) {
  return (
    <PanelLayout path="blog/" title="Blog" terminalChrome>
      <div className="max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-mono)] text-2xl md:text-3xl text-[var(--color-text)] mb-2">
        Blog
      </h1>
      <p className="text-[var(--color-subtle)] mb-8">
        Notes on what I&apos;m building, reading, and learning.
      </p>

      {posts.length === 0 ? (
        <p className="text-[var(--color-muted)] font-[family-name:var(--font-mono)]">
          No posts yet.
        </p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-4 rounded-lg border border-[var(--color-overlay)] hover:border-[var(--color-iris)] bg-[var(--color-base)] transition-colors group"
            >
              <time className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-muted)]">
                {post.date}
              </time>
              <h2 className="text-lg text-[var(--color-text)] group-hover:text-[var(--color-love)] transition-colors mt-1 mb-1">
                {post.title}
              </h2>
              <p className="text-sm text-[var(--color-subtle)] line-clamp-2">
                {post.excerpt}
              </p>
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-[family-name:var(--font-mono)] text-xs px-1.5 py-0.5 rounded text-[var(--color-foam)] bg-[var(--color-overlay)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
      </div>
    </PanelLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const dir = path.join(process.cwd(), "content", "blog");
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith(".md"))
    : [];

  const posts: PostMeta[] = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      tags: data.tags ?? [],
    };
  });

  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  return { props: { posts } };
};
