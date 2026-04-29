"use client";

import Giscus from "@giscus/react";
import { useTheme } from "@/hooks/useTheme";

export function GiscusComments() {
  const { resolved } = useTheme();

  if (!process.env.NEXT_PUBLIC_GISCUS_REPO) {
    return (
      <div className="mt-12 rounded-card border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 text-center text-sm text-[var(--color-muted)]">
        评论系统未配置。请设置 Giscus 相关环境变量。
      </div>
    );
  }

  return (
    <div className="mt-12 rounded-card border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6">
      <Giscus
        repo={process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`}
        repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
        category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY!}
        categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolved === "dark" ? "dark" : "light"}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
