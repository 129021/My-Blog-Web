import type { NavLink } from "@/types";

export const SITE = {
  title: "CyberLog",
  description: "探索技术、代码与未来的个人博客",
  author: "Jianqin Wang",
  role: "Full-Stack Developer",
  tagline: "构建数字世界的无限可能",
  url: "https://myblog.com",
  email: "me@example.com",
  ownerEmail: process.env.OWNER_EMAIL || "me@example.com",
  since: 2024,
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "首页", href: "/" },
  { label: "分类", href: "/categories" },
  { label: "标签", href: "/tags" },
  { label: "关于", href: "/about" },
];

export const SOCIAL_LINKS = {
  github: "https://github.com",
  twitter: "https://twitter.com",
  email: "mailto:me@example.com",
  rss: "/rss.xml",
} as const;

export const GISCUS_CONFIG = {
  repo: "" as string,
  repoId: "" as string,
  category: "" as string,
  categoryId: "" as string,
} as const;

export const POSTS_PER_PAGE = 9;
