import fs from "fs";
import path from "path";
import { useEffect, useMemo, useRef, useState } from "react";
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

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>("[data-reveal]");
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

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function BlogIndex({ posts }: { posts: PostMeta[] }) {
  const listRef = useScrollReveal();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [posts, query, activeTag]);

  return (
    <PanelLayout path="blog/" title="Blog" terminalChrome>
      <h1 className="font-[family-name:var(--font-mono)] text-2xl md:text-3xl text-[var(--color-text)] mb-2">
        Blog
      </h1>
      <p className="text-[var(--color-subtle)] mb-12">
        Notes on what I&apos;m building, reading, and learning.
      </p>

      {/* TODO: search and tag filter — commented out for now */}
      {/* <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center font-[family-name:var(--font-mono)] text-sm text-[var(--color-muted)] rounded-lg border border-[var(--color-overlay)] bg-[var(--color-base)] px-4 py-3">
          <span className="text-[var(--color-foam)] mr-2">grep</span>
          <span className="text-[var(--color-muted)] mr-2">-i</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search posts..."
            className="flex-1 bg-transparent outline-none text-[var(--color-text)] placeholder:text-[var(--color-muted)]"
          />
        </div>
      </div>

      {allTags.length > 0 && (
        <div className="max-w-2xl mx-auto flex flex-wrap gap-3 mb-16">
          <button
            onClick={() => setActiveTag(null)}
            className={`font-[family-name:var(--font-mono)] text-xs px-2 py-0.5 rounded border transition-colors ${
              !activeTag
                ? "border-[var(--color-iris)] text-[var(--color-iris)]"
                : "border-[var(--color-overlay)] text-[var(--color-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            all
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`font-[family-name:var(--font-mono)] text-xs px-2 py-0.5 rounded border transition-colors ${
                activeTag === tag
                  ? "border-[var(--color-iris)] text-[var(--color-iris)]"
                  : "border-[var(--color-overlay)] text-[var(--color-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )} */}

      {posts.length === 0 ? (
        <p className="max-w-2xl mx-auto text-[var(--color-muted)] font-[family-name:var(--font-mono)] text-sm">
          No posts yet.
        </p>
      ) : (
        <div ref={listRef} className="max-w-2xl mx-auto space-y-8">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              data-reveal
              className="block p-4 rounded-lg border border-[var(--color-overlay)] hover:border-[var(--color-iris)] bg-[var(--color-base)] transition-all group opacity-0 translate-y-6 [&.revealed]:opacity-100 [&.revealed]:translate-y-0"
              style={{ transitionDuration: "0.5s", transitionDelay: `${index * 0.1}s` }}
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
