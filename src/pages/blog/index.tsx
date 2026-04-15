import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Link from "next/link";
import type { GetStaticProps } from "next";

import Navbar from "@/sections/Navbar";
import SocialIcons from "@/components/SocialIcons";
import BackHome from "@/components/BackHome";

type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
};

export default function BlogIndex({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="app">
      <Head>
        <title>Blog — Weiting Chen</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <SocialIcons />
      <BackHome />
      <main>
        <section className="blog-list">
          <h1 className="blog-list-title">Blog</h1>
          <p className="blog-list-subtitle">
            Notes on what I&apos;m building, reading, and learning.
          </p>

          {posts.length === 0 ? (
            <p className="blog-list-empty">No posts yet.</p>
          ) : (
            <ul className="blog-list-items">
              {posts.map((post) => (
                <li key={post.slug} className="blog-list-item">
                  <Link href={`/blog/${post.slug}`} className="blog-list-item-link">
                    <time className="blog-list-item-date">{post.date}</time>
                    <h2 className="blog-list-item-title">{post.title}</h2>
                    <p className="blog-list-item-excerpt">{post.excerpt}</p>
                    {post.tags?.length > 0 && (
                      <ul className="blog-list-item-tags">
                        {post.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
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
