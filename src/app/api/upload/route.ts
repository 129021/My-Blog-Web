import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isOwner } from "@/lib/auth-utils";

const ALLOWED_IMAGE = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];
const ALLOWED_VIDEO = ["video/mp4", "video/webm"];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(req: NextRequest) {
  const owner = await isOwner();
  if (!owner) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const isImage = ALLOWED_IMAGE.includes(file.type);
  const isVideo = ALLOWED_VIDEO.includes(file.type);

  if (!isImage && !isVideo) {
    return NextResponse.json(
      { error: "只支持图片(png/jpg/gif/webp/svg)和视频(mp4/webm)" },
      { status: 400 },
    );
  }

  const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE;
  if (file.size > maxSize) {
    const limit = isImage ? "10MB" : "50MB";
    return NextResponse.json(
      { error: `文件大小不能超过${limit}` },
      { status: 400 },
    );
  }

  const ext = file.name.split(".").pop() || "png";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const subDir = isImage ? "images" : "videos";
  const dir = path.join(process.cwd(), "public", subDir);

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(dir, safeName), buffer);

  return NextResponse.json({ url: `/${subDir}/${safeName}` });
}
