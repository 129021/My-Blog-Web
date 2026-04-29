"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@/types";
import { Badge } from "@/components/ui/Badge";

function CalendarIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <Link href={`/posts/${slug}`}>
      <motion.article
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.15 }}
        className="group h-full overflow-hidden rounded-card border border-[var(--color-card-border)] bg-[var(--color-card-bg)] shadow-lg transition-shadow hover:shadow-xl hover:shadow-cyan-500/5"
      >
        <div className="p-6">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="cyan">
              {frontmatter.category}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold leading-snug text-[var(--color-fg)] transition-colors group-hover:text-cyan-400">
            {frontmatter.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-[var(--color-muted)]">
            {frontmatter.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[var(--color-muted)]">
            <span className="inline-flex items-center gap-1">
              <CalendarIcon />
              {frontmatter.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <ClockIcon />
              {readingTime} 分钟
            </span>
          </div>

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-[var(--color-glass-bg)] px-2 py-0.5 text-xs text-[var(--color-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.article>
    </Link>
  );
}
