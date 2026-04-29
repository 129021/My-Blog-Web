import Link from "next/link";
import type { Post } from "@/types";

interface PostNavProps {
  prev: Post | null;
  next: Post | null;
}

export function PostNav({ prev, next }: PostNavProps) {
  if (!prev && !next) return null;

  return (
    <nav className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/posts/${prev.slug}`}
          className="group rounded-card border border-[var(--color-border)] bg-[var(--color-card-bg)] p-4 transition-all hover:border-cyan-500/30 hover:shadow-lg"
        >
          <span className="text-xs text-[var(--color-muted)]">← 上一篇</span>
          <p className="mt-1 text-sm font-medium text-[var(--color-fg)] transition-colors group-hover:text-cyan-400">
            {prev.frontmatter.title}
          </p>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/posts/${next.slug}`}
          className="group rounded-card border border-[var(--color-border)] bg-[var(--color-card-bg)] p-4 text-right transition-all hover:border-cyan-500/30 hover:shadow-lg"
        >
          <span className="text-xs text-[var(--color-muted)]">下一篇 →</span>
          <p className="mt-1 text-sm font-medium text-[var(--color-fg)] transition-colors group-hover:text-cyan-400">
            {next.frontmatter.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
