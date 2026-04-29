import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTimeLib from "reading-time";
import type { Post, PostFrontmatter, Category, Tag } from "@/types";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("._"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = data as PostFrontmatter;
    const readingTime = Math.ceil(readingTimeLib(content).minutes);

    return {
      slug: file.replace(/\.md$/, ""),
      frontmatter,
      content,
      readingTime,
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  const readingTime = Math.ceil(readingTimeLib(content).minutes);

  return { slug, frontmatter, content, readingTime };
}

export function getCategories(): Category[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();

  for (const post of posts) {
    const c = post.frontmatter.category;
    if (c) map.set(c, (map.get(c) || 0) + 1);
  }

  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getTags(): Tag[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.frontmatter.tags || []) {
      map.set(tag, (map.get(tag) || 0) + 1);
    }
  }

  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(
    (p) => p.frontmatter.category === category,
  );
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) =>
    (p.frontmatter.tags || []).includes(tag),
  );
}

export function getAdjacentPosts(
  slug: string,
): { prev: Post | null; next: Post | null } {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1]! : null,
    next: idx > 0 ? posts[idx - 1]! : null,
  };
}
