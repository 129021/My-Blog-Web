import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function LatestPosts() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-h1 font-bold">
              最新<GradientText variant="cyan">文章</GradientText>
            </h2>
            <p className="mt-2 text-[var(--color-muted)]">
              记录技术思考与探索
            </p>
          </div>
          <Link href="/categories">
            <Button variant="ghost" size="sm">
              查看全部
              <svg className="ml-1 inline h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.1}>
            <PostCard post={post} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
