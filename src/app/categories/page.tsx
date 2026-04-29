import type { Metadata } from "next";
import { getCategories } from "@/lib/posts";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { GradientText } from "@/components/ui/GradientText";

export const metadata: Metadata = {
  title: "分类",
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-h1 font-bold">
          文章<GradientText variant="cyan">分类</GradientText>
        </h1>
        <p className="mt-2 text-[var(--color-muted)]">
          共 {categories.length} 个分类
        </p>
      </div>

      {categories.length === 0 ? (
        <p className="text-center text-[var(--color-muted)]">暂无分类</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.name} category={cat} />
          ))}
        </div>
      )}
    </div>
  );
}
