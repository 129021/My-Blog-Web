import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { isOwner } from "@/lib/auth-utils";
import { getAllPosts, getCategories, getTags } from "@/lib/posts";
import { GradientText } from "@/components/ui/GradientText";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "管理后台",
};

export default async function AdminPage() {
  const owner = await isOwner();
  if (!owner) redirect("/");

  const posts = getAllPosts();
  const categories = getCategories();
  const tags = getTags();

  const stats = [
    { label: "文章总数", value: posts.length },
    { label: "分类数量", value: categories.length },
    { label: "标签数量", value: tags.length },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-h1 font-bold">
        管理<GradientText variant="cyan">后台</GradientText>
      </h1>
      <p className="mt-2 text-[var(--color-muted)]">
        仅网站主人可以访问此页面
      </p>

      {/* Stats */}
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <p className="text-3xl font-bold gradient-text-cyan">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              {stat.label}
            </p>
          </Card>
        ))}
      </div>

      {/* Recent posts */}
      <div className="mt-12">
        <h2 className="text-h2 font-bold">
          文章<GradientText variant="purple">列表</GradientText>
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="py-3 pr-4 font-medium">标题</th>
                <th className="py-3 pr-4 font-medium">分类</th>
                <th className="py-3 pr-4 font-medium">日期</th>
                <th className="py-3 font-medium">阅读时间</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.slug}
                  className="border-b border-[var(--color-border)]"
                >
                  <td className="py-3 pr-4 font-medium">{post.frontmatter.title}</td>
                  <td className="py-3 pr-4 text-[var(--color-muted)]">
                    {post.frontmatter.category}
                  </td>
                  <td className="py-3 pr-4 text-[var(--color-muted)]">
                    {post.frontmatter.date}
                  </td>
                  <td className="py-3 text-[var(--color-muted)]">
                    {post.readingTime} 分钟
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
