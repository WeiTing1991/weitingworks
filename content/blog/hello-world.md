---
title: "Blog Template"
date: "2026-04-15"
excerpt: "First post — how this blog is wired up and what you can put in a post."
tags: ["meta", "nextjs"]
---

This is the first post. The file lives in `content/blog/hello-world.md` and is
rendered by `src/pages/blog/[slug].tsx` at build time.

## What works out of the box

- **GitHub-flavored markdown** — tables, strikethrough, task lists
- Inline `code` and fenced code blocks
- Images: `![alt](/project/some-image.jpg)` (paths resolve against `public/`)
- Links like [the about section](/#about)

```ts
// Code blocks render via rehype-highlight if you wire its CSS in.
function greet(name: string) {
  return `Hello, ${name}!`;
}
```

## How to add a new post

Drop another `.md` file into `content/blog/` with frontmatter:

```md
---
title: "..."
date: "YYYY-MM-DD"
excerpt: "One-liner for the index page."
---

Body goes here.
```

That's it. Next build, the post appears on `/blog`.
