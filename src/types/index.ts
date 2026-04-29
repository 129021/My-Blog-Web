export interface PostFrontmatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  cover?: string;
  author?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: number;
}

export interface Category {
  name: string;
  count: number;
}

export interface Tag {
  name: string;
  count: number;
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export type Theme = "system" | "light" | "dark";

export interface NavLink {
  label: string;
  href: string;
}
