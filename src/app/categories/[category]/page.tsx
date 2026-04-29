import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostsByCategory, getCategories } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { GradientText } from "@/components/ui/GradientText";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.name }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  return { title: `分类：${decodeURIComponent(category)}` };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const posts = getPostsByCategory(decoded);

  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-h1 font-bold">
          分类：<GradientText variant="cyan">{decoded}</GradientText>
        </h1>
        <p className="mt-2 text-[var(--color-muted)]">
          共 {posts.length} 篇文章
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
