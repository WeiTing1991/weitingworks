import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import type { GetStaticPaths, GetStaticProps } from "next";

import Navbar from "@/sections/Navbar";
import SocialIcons from "@/components/SocialIcons";
import BackHome from "@/components/BackHome";

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
    <div className="app">
      <Head>
        <title>{post.title} — Weiting Chen</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <SocialIcons />
      <BackHome />
      <main>
        <article className="blog-post">
          <header className="blog-post-header">
            <Link href="/blog" className="blog-post-back">
              ← All posts
            </Link>
            <time className="blog-post-date">{post.date}</time>
            <h1 className="blog-post-title">{post.title}</h1>
            {post.tags?.length > 0 && (
              <ul className="blog-post-tags">
                {post.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </header>

          <div className="blog-post-body markdown-content">
            <Markdown
              remarkPlugins={[remarkGfm, remarkImages]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
            >
              {post.content}
            </Markdown>
          </div>
        </article>
      </main>
    </div>
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
