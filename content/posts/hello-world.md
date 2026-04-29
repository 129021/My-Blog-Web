---
title: "Hello World：用 Next.js 15 构建现代博客"
date: "2026-04-20"
category: "前端开发"
tags: ["Next.js", "React", "TypeScript"]
description: "介绍如何使用 Next.js 15 App Router 从零搭建一个高性能的个人博客网站。"
cover: ""
author: "Jianqin Wang"
---

## 前言

Next.js 15 带来了更强大的 App Router 和 React Server Components，让构建高性能博客变得前所未有的简单。本文将介绍核心架构设计。

## 为什么选择 Next.js 15

Next.js 15 相比之前版本有以下几个关键改进：

- **App Router 稳定**：基于文件系统的路由，支持布局嵌套、加载状态、错误边界
- **React Server Components**：默认服务端渲染，减少客户端 JavaScript 体积
- **流式渲染**：使用 `loading.tsx` 和 `Suspense` 实现渐进式页面加载
- **图片优化**：内置 `next/image` 组件，自动优化图片格式和尺寸

## 项目架构

```typescript
// app/layout.tsx - 根布局
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## 总结

Next.js 15 的 App Router 提供了一流的开发体验。配合 Tailwind CSS 和 Framer Motion，可以快速构建出既美观又高性能的博客。

| 特性 | 支持情况 |
|------|----------|
| SSR | ✅ |
| SSG | ✅ |
| ISR | ✅ |
| 流式渲染 | ✅ |
