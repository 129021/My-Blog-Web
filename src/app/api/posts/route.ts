import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isOwner } from "@/lib/auth-utils";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export async function POST(req: NextRequest) {
  const owner = await isOwner();
  if (!owner) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { slug, title, date, category, tags, description, content } = await req.json();

  if (!slug) return NextResponse.json({ error: "请填写 Slug" }, { status: 400 });
  if (!title) return NextResponse.json({ error: "请填写标题" }, { status: 400 });
  if (!content) return NextResponse.json({ error: "请填写内容" }, { status: 400 });

  const frontmatter = [
    "---",
    `title: "${title}"`,
    `date: "${date || new Date().toISOString().split("T")[0]}"`,
    `category: "${category || "未分类"}"`,
    `tags: [${tags?.map((t: string) => `"${t}"`).join(", ") || ""}]`,
    `description: "${description || ""}"`,
    `author: "Jason Wang"`,
    "---",
    "",
    content,
  ].join("\n");

  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.writeFileSync(path.join(POSTS_DIR, `${slug}.md`), frontmatter);

  return NextResponse.json({ success: true, slug });
}
