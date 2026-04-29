import type { Metadata } from "next";
import { GradientText } from "@/components/ui/GradientText";
import { Card } from "@/components/ui/Card";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "关于我",
};

const SKILLS = [
  "TypeScript", "React", "Next.js", "Node.js",
  "Tailwind CSS", "Framer Motion", "PostgreSQL", "Docker",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-h1 font-bold">
        关于<GradientText variant="cyan">我</GradientText>
      </h1>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-[var(--color-fg)]">
        <p>
          我是 {SITE.author}，一名 {SITE.role}，专注于构建高性能、优雅的 Web 应用。
        </p>
        <p>
          我热爱开源技术和极致的用户体验。工作之余，我通过写作整理思路、分享知识。
          这个博客是我数字花园的一部分，记录了我在技术探索中的思考和心得。
        </p>
        <p>
          如果你对我的工作感兴趣，或者想交流技术话题，欢迎通过以下方式联系我。
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-h2 font-bold">
          技能<GradientText variant="purple">栈</GradientText>
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass-bg)] px-4 py-2 text-sm font-medium text-[var(--color-fg)]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-h2 font-bold">
          联系<GradientText variant="cyan">方式</GradientText>
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Card>
            <h3 className="font-semibold">GitHub</h3>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-sm text-cyan-400 hover:underline"
            >
              查看代码 →
            </a>
          </Card>
          <Card>
            <h3 className="font-semibold">Twitter</h3>
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-sm text-cyan-400 hover:underline"
            >
              关注动态 →
            </a>
          </Card>
          <Card>
            <h3 className="font-semibold">Email</h3>
            <a
              href={SOCIAL_LINKS.email}
              className="mt-1 text-sm text-cyan-400 hover:underline"
            >
              发送邮件 →
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
