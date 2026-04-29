"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Tag } from "@/types";

interface TagCloudProps {
  tags: Tag[];
}

export function TagCloud({ tags }: TagCloudProps) {
  if (tags.length === 0) return null;

  const maxCount = tags[0]!.count;
  const minCount = tags[tags.length - 1]!.count;
  const range = maxCount - minCount || 1;

  function getFontSize(count: number): string {
    const normalized = (count - minCount) / range;
    const min = 0.85;
    const max = 2.2;
    return `${min + normalized * (max - min)}rem`;
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {tags.map((tag) => (
        <motion.div
          key={tag.name}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href={`/tags/${tag.name}`}
            className="inline-block rounded-full border border-[var(--color-border)] bg-[var(--color-glass-bg)] px-4 py-2 text-[var(--color-fg)] transition-all hover:border-cyan-500/50 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10"
            style={{ fontSize: getFontSize(tag.count) }}
          >
            {tag.name}
            <span className="ml-1 text-xs text-[var(--color-muted)]">
              ({tag.count})
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
