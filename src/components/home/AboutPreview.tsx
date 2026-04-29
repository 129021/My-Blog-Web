import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import Link from "next/link";

export function AboutPreview() {
  return (
    <section className="border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-h1 font-bold">
            关于<GradientText variant="cyan">我</GradientText>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
            我是 {SITE.author}，一名 {SITE.role}。
            热爱构建优雅的代码和极致的用户体验。专注于 React 生态系统和现代前端技术栈。写作是我整理思路和分享知识的方式。
          </p>
          <div className="mt-8">
            <Link href="/about">
              <Button variant="primary" size="md">
                了解更多
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
