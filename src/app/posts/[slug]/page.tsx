import { notFound } from "next/navigation";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { getPostBySlug, getAdjacentPosts } from "@/lib/posts";
import { MDXRenderer } from "@/components/blog/MDXRenderer";
import { PostMeta } from "@/components/blog/PostMeta";
import { PostNav } from "@/components/blog/PostNav";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { GiscusComments } from "@/components/blog/GiscusComments";
import { ViewCounter } from "@/components/blog/ViewCounter";
import type { TOCItem } from "@/types";

function getViews(slug: string): number {
  try {
    const viewsFile = path.join(process.cwd(), "content/views.json");
    if (!fs.existsSync(viewsFile)) return 0;
    const data = JSON.parse(fs.readFileSync(viewsFile, "utf-8"));
    return data[slug] || 0;
  } catch {
    return 0;
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

function extractTOC(content: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TOCItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1]!.length;
    const text = match[2]!.trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\u{4e00}-\u{9fff}]+/gu, "-")
      .replace(/^-|-$/g, "");
    items.push({ id, text, level });
  }

  return items;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(decodeURIComponent(slug));
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  // Next.js may not fully decode non-ASCII slugs, so decode again
  const post = getPostBySlug(decodeURIComponent(slug));

  if (!post) notFound();

  const toc = extractTOC(post.content);
  const { prev, next } = getAdjacentPosts(slug);
  const views = getViews(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="lg:flex lg:gap-10">
        {/* TOC Sidebar - left */}
        <div className="hidden lg:block lg:w-56 lg:shrink-0">
          <TableOfContents items={toc} />
        </div>

        {/* Main content */}
        <article className="min-w-0 flex-1">
          <PostMeta post={post} views={views} />
          <ViewCounter slug={slug} />

          <div className="mt-8 border-t border-[var(--color-border)] pt-8">
            <MDXRenderer source={post.content} />
          </div>

          <div className="mt-12">
            <PostNav prev={prev} next={next} />
          </div>

          <GiscusComments />
        </article>
      </div>
    </div>
  );
}
