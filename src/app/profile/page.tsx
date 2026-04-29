import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { isAuthenticated, getSession } from "@/lib/auth-utils";
import { GradientText } from "@/components/ui/GradientText";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "个人中心",
};

export default async function ProfilePage() {
  const authed = await isAuthenticated();
  if (!authed) redirect("/");

  const session = await getSession();

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-h1 font-bold">
        个人<GradientText variant="cyan">中心</GradientText>
      </h1>

      {/* User info */}
      <Card className="mt-8 flex items-center gap-4">
        {session?.user?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={session.user.image}
            alt=""
            className="h-16 w-16 rounded-full"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-xl font-bold text-white">
            {(session?.user?.name || "U")[0]}
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold">{session?.user?.name}</h2>
          <p className="text-sm text-[var(--color-muted)]">
            {session?.user?.email}
          </p>
        </div>
      </Card>

      {/* Favorites placeholder */}
      <div className="mt-10">
        <h2 className="text-h2 font-bold">
          我的<GradientText variant="purple">收藏</GradientText>
        </h2>
        <p className="mt-4 text-[var(--color-muted)]">
          暂无收藏文章。浏览文章时点击收藏即可在此查看。
        </p>
      </div>

      {/* Comments placeholder */}
      <div className="mt-10">
        <h2 className="text-h2 font-bold">
          我的<GradientText variant="cyan">评论</GradientText>
        </h2>
        <p className="mt-4 text-[var(--color-muted)]">
          暂无评论记录。在文章下方发表评论后将在此汇总展示。
        </p>
      </div>
    </div>
  );
}
