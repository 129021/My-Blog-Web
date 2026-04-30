"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Post, Category, Tag } from "@/types";
import { GradientText } from "@/components/ui/GradientText";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Props {
  posts: Post[];
  categories: Category[];
  tags: Tag[];
  viewsData: Record<string, number>;
}

interface ArticleForm {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string;
  description: string;
  content: string;
}

const emptyForm: ArticleForm = {
  slug: "",
  title: "",
  date: new Date().toISOString().split("T")[0]!,
  category: "",
  tags: "",
  description: "",
  content: "",
};

export function AdminPanel({ posts, categories, tags, viewsData }: Props) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<ArticleForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalViews = Object.values(viewsData).reduce((a, b) => a + b, 0);

  function openCreate() {
    setEditingSlug(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  }

  function openEdit(post: Post) {
    setEditingSlug(post.slug);
    setForm({
      slug: post.slug,
      title: post.frontmatter.title,
      date: post.frontmatter.date,
      category: post.frontmatter.category,
      tags: (post.frontmatter.tags || []).join(", "),
      description: post.frontmatter.description || "",
      content: post.content,
    });
    setError("");
    setShowForm(true);
  }

  function cancelForm() {
    setShowForm(false);
    setEditingSlug(null);
    setForm(emptyForm);
    setError("");
  }

  function updateField(field: keyof ArticleForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function insertAtCursor(text: string) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = form.content.slice(0, start);
    const after = form.content.slice(end);
    const newContent = before + text + after;
    setForm((prev) => ({ ...prev, content: newContent }));
    requestAnimationFrame(() => {
      textarea.focus();
      const pos = start + text.length;
      textarea.setSelectionRange(pos, pos);
    });
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body });
    if (res.ok) {
      const { url } = await res.json();
      insertAtCursor(`![${file.name}](${url})`);
    } else {
      const { error: msg } = await res.json();
      alert(msg || "上传失败");
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleVideoInsert() {
    const url = prompt("输入视频链接（支持 YouTube/Bilibili/直链），或取消：");
    if (!url || !url.trim()) return;

    const trimmed = url.trim();

    const ytMatch = trimmed.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    );
    if (ytMatch) {
      const videoId = ytMatch[1]!;
      insertAtCursor(
        `<iframe width="100%" height="450" src="https://www.youtube.com/embed/${videoId}" frameBorder="0" allowFullScreen></iframe>`,
      );
      return;
    }

    const biliMatch = trimmed.match(
      /bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/,
    );
    if (biliMatch) {
      const bvid = biliMatch[1]!;
      insertAtCursor(
        `<iframe width="100%" height="450" src="//player.bilibili.com/player.html?bvid=${bvid}&page=1" frameBorder="0" allowFullScreen></iframe>`,
      );
      return;
    }

    insertAtCursor(`<video src="${trimmed}" controls width="100%"></video>`);
  }

  async function handleSave() {
    setSaving(true);
    setError("");

    if (!editingSlug && !form.slug.trim()) {
      setError("请填写 Slug（文章 URL 标识）");
      setSaving(false);
      return;
    }
    if (!form.title.trim()) {
      setError("请填写文章标题");
      setSaving(false);
      return;
    }
    if (!form.content.trim()) {
      setError("请填写文章内容");
      setSaving(false);
      return;
    }

    const url = editingSlug
      ? `/api/posts/${editingSlug}`
      : "/api/posts";
    const method = editingSlug ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(editingSlug ? {} : { slug: form.slug }),
        title: form.title,
        date: form.date,
        category: form.category || "未分类",
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        description: form.description,
        content: form.content,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "保存失败");
      setSaving(false);
      return;
    }

    setSaving(false);
    setShowForm(false);
    setEditingSlug(null);
    setForm(emptyForm);
    router.refresh();
  }

  async function handleDelete(slug: string) {
    if (!confirm(`确定删除文章 "${slug}"？此操作不可撤销。`)) return;

    setDeleting(slug);
    const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("删除失败");
    }
    setDeleting(null);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-bold">
            管理<GradientText variant="cyan">后台</GradientText>
          </h1>
          <p className="mt-2 text-[var(--color-muted)]">仅网站主人可访问</p>
        </div>
        <Button onClick={openCreate}>+ 新建文章</Button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-6 sm:grid-cols-4">
        {[
          { label: "文章总数", value: posts.length },
          { label: "分类数量", value: categories.length },
          { label: "标签数量", value: tags.length },
          { label: "总阅读量", value: totalViews },
        ].map((stat) => (
          <Card key={stat.label} className="text-center">
            <p className="text-3xl font-bold gradient-text-cyan">{stat.value}</p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Editor Form */}
      {showForm && (
        <Card className="mt-8">
          <h2 className="text-h2 font-bold mb-6">
            {editingSlug ? "编辑文章" : "新建文章"}
          </h2>

          {error && (
            <p className="mb-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  disabled={!!editingSlug}
                  placeholder="my-article-slug"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">日期</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">标题</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="文章标题"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">分类</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  placeholder="前端"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">标签 (逗号分隔)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => updateField("tags", e.target.value)}
                  placeholder="React, Next.js"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">描述</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="文章简介..."
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Markdown 内容</label>
              <div className="mb-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center gap-1 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs hover:border-cyan-400 hover:text-cyan-400 transition-colors disabled:opacity-50"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {uploading ? "上传中..." : "插入图片"}
                </button>
                <button
                  type="button"
                  onClick={handleVideoInsert}
                  className="inline-flex items-center gap-1 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  插入视频
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              <textarea
                ref={textareaRef}
                value={form.content}
                onChange={(e) => updateField("content", e.target.value)}
                rows={16}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "保存中..." : "保存"}
              </Button>
              <Button variant="ghost" onClick={cancelForm}>
                取消
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Article list */}
      <div className="mt-12">
        <h2 className="text-h2 font-bold">
          文章<GradientText variant="purple">列表</GradientText>
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="py-3 pr-4 font-medium">标题</th>
                <th className="py-3 pr-4 font-medium">分类</th>
                <th className="py-3 pr-4 font-medium">日期</th>
                <th className="py-3 pr-4 font-medium">阅读量</th>
                <th className="py-3 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.slug}
                  className="border-b border-[var(--color-border)]"
                >
                  <td className="py-3 pr-4 font-medium">
                    {post.frontmatter.title}
                  </td>
                  <td className="py-3 pr-4 text-[var(--color-muted)]">
                    {post.frontmatter.category}
                  </td>
                  <td className="py-3 pr-4 text-[var(--color-muted)]">
                    {post.frontmatter.date}
                  </td>
                  <td className="py-3 pr-4 text-[var(--color-muted)]">
                    {viewsData[post.slug] || 0}
                  </td>
                  <td className="py-3 space-x-2">
                    <button
                      onClick={() => openEdit(post)}
                      className="text-cyan-400 hover:underline text-xs"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      disabled={deleting === post.slug}
                      className="text-red-400 hover:underline text-xs disabled:opacity-50"
                    >
                      {deleting === post.slug ? "删除中..." : "删除"}
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[var(--color-muted)]">
                    暂无文章
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
