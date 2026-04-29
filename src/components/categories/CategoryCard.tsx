import Link from "next/link";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.name}`}>
      <div className="group rounded-card border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-8 text-center shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5">
        <h3 className="text-xl font-bold text-[var(--color-fg)] transition-colors group-hover:text-cyan-400">
          {category.name}
        </h3>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          {category.count} 篇文章
        </p>
      </div>
    </Link>
  );
}
