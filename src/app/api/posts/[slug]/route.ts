import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isOwner } from "@/lib/auth-utils";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const owner = await isOwner();
  if (!owner) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { slug: urlSlug } = await params;
  const { title, date, category, tags, description, content } = await req.json();

  const filePath = path.join(POSTS_DIR, `${urlSlug}.md`);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const frontmatter = [
    "---",
    `title: "${title}"`,
    `date: "${date}"`,
    `category: "${category}"`,
    `tags: [${tags?.map((t: string) => `"${t}"`).join(", ") || ""}]`,
    `description: "${description}"`,
    `author: "Jason Wang"`,
    "---",
    "",
    content,
  ].join("\n");

  fs.writeFileSync(filePath, frontmatter);

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const owner = await isOwner();
  if (!owner) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { slug } = await params;
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  return NextResponse.json({ success: true });
}
