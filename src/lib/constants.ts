import type { NavLink } from "@/types";

export const SITE = {
  title: "CyberLog",
  description: "探索技术、代码与未来的个人博客",
  author: "Jason Wang",
  role: "Full-Stack Developer",
  tagline: "构建数字世界的无限可能",
  url: "https://myblog.com",
  email: "jasonwang1997@foxmail.com",
  ownerEmails: (process.env.NEXT_PUBLIC_OWNER_EMAIL || "me@example.com")
    .split(",")
    .map((e) => e.trim()),
  since: 2024,
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "首页", href: "/" },
  { label: "分类", href: "/categories" },
  { label: "标签", href: "/tags" },
  { label: "关于", href: "/about" },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/129021",
  twitter: "https://twitter.com",
  email: "mailto:jasonwang1997@foxmail.com",
  rss: "/rss.xml",
} as const;

export const GISCUS_CONFIG = {
  repo: "" as string,
  repoId: "" as string,
  category: "" as string,
  categoryId: "" as string,
} as const;

export const UMAMI = {
  websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "",
  scriptUrl:
    process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ||
    "https://cloud.umami.is/script.js",
} as const;

export const POSTS_PER_PAGE = 9;
