import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import type { GetStaticPaths, GetStaticProps } from "next";
import PanelLayout from "@/components/PanelLayout";

type Post = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export default function BlogPost({ post }: { post: Post }) {
  return (
    <PanelLayout path={`blog/${post.slug}/`} title={post.title} terminalChrome>
      <div className="max-w-2xl mx-auto mt-10 md:mt-20">
        <Link
          href="/blog"
          className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-subtle)] hover:text-[var(--color-love)] transition-colors mb-6 inline-block"
        >
          &lt;- back to blog
        </Link>

        <header className="mb-8">
          <time className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-muted)]">
            {post.date}
          </time>
          <h1 className="font-[family-name:var(--font-mono)] text-2xl md:text-3xl text-[var(--color-text)] mt-2 mb-3">
            {post.title}
          </h1>
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-[family-name:var(--font-mono)] text-xs px-2 py-0.5 rounded border border-[var(--color-overlay)] text-[var(--color-foam)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-invert max-w-none text-[var(--color-text)] [&_a]:text-[var(--color-love)] [&_h1]:text-[var(--color-text)] [&_h2]:text-[var(--color-text)] [&_h3]:text-[var(--color-text)] [&_h1]:font-[family-name:var(--font-mono)] [&_h2]:font-[family-name:var(--font-mono)] [&_h3]:font-[family-name:var(--font-mono)] [&_code]:text-[var(--color-foam)] [&_code]:bg-[var(--color-overlay)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_strong]:text-[var(--color-text)] [&_blockquote]:border-[var(--color-iris)]">
          <Markdown
            remarkPlugins={[remarkGfm, remarkImages]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
          >
            {post.content}
          </Markdown>
        </div>

        <Link
          href="/blog"
          className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-subtle)] hover:text-[var(--color-love)] transition-colors mt-10 inline-block"
        >
          &lt;- back to blog
        </Link>
      </div>
    </PanelLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.existsSync(BLOG_DIR)
    ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))
    : [];

  return {
    paths: files.map((f) => ({ params: { slug: f.replace(/\.md$/, "") } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = String(params?.slug);
  const file = path.join(BLOG_DIR, `${slug}.md`);
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);

  const post: Post = {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    tags: data.tags ?? [],
    content,
  };

  return { props: { post } };
};
