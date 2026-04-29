import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const VIEWS_FILE = path.join(process.cwd(), "content/views.json");

function readViews(): Record<string, number> {
  try {
    if (!fs.existsSync(VIEWS_FILE)) return {};
    return JSON.parse(fs.readFileSync(VIEWS_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function writeViews(views: Record<string, number>) {
  const dir = path.dirname(VIEWS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(VIEWS_FILE, JSON.stringify(views, null, 2));
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  const views = readViews();
  if (slug) {
    return NextResponse.json({ views: views[slug] || 0 });
  }
  return NextResponse.json(views);
}

export async function POST(req: NextRequest) {
  const { slug } = await req.json();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  const views = readViews();
  views[slug] = (views[slug] || 0) + 1;
  writeViews(views);
  return NextResponse.json({ views: views[slug] });
}
