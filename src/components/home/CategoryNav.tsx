import { getCategories } from "@/lib/posts";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientText } from "@/components/ui/GradientText";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export function CategoryNav() {
  const categories = getCategories();

  if (categories.length === 0) return null;

  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-card-bg)]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="mb-12 text-center text-h1 font-bold">
            探索<GradientText variant="purple">分类</GradientText>
          </h2>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 0.1}>
              <Link href={`/categories/${cat.name}`}>
                <Card glow className="flex items-center justify-between p-6">
                  <span className="text-lg font-semibold">{cat.name}</span>
                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">
                    {cat.count} 篇
                  </span>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
