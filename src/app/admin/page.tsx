import { redirect } from "next/navigation";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { isOwner } from "@/lib/auth-utils";
import { getAllPosts, getCategories, getTags } from "@/lib/posts";
import { AdminPanel } from "@/components/admin/AdminPanel";

export const metadata: Metadata = {
  title: "管理后台",
};

function getViewsData(): Record<string, number> {
  try {
    const viewsFile = path.join(process.cwd(), "content/views.json");
    if (!fs.existsSync(viewsFile)) return {};
    return JSON.parse(fs.readFileSync(viewsFile, "utf-8"));
  } catch {
    return {};
  }
}

export default async function AdminPage() {
  const owner = await isOwner();
  if (!owner) redirect("/");

  const posts = getAllPosts();
  const categories = getCategories();
  const tags = getTags();
  const viewsData = getViewsData();

  return (
    <AdminPanel
      posts={posts}
      categories={categories}
      tags={tags}
      viewsData={viewsData}
    />
  );
}
