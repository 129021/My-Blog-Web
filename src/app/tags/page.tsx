import type { Metadata } from "next";
import { getTags } from "@/lib/posts";
import { TagCloud } from "@/components/categories/TagCloud";
import { GradientText } from "@/components/ui/GradientText";

export const metadata: Metadata = {
  title: "标签",
};

export default function TagsPage() {
  const tags = getTags();

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-h1 font-bold">
          标签<GradientText variant="purple">云</GradientText>
        </h1>
        <p className="mt-2 text-[var(--color-muted)]">
          共 {tags.length} 个标签
        </p>
      </div>

      <TagCloud tags={tags} />
    </div>
  );
}
