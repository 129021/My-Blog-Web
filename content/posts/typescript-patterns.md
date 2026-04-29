---
title: "TypeScript 高级类型体操实战"
date: "2026-04-15"
category: "编程语言"
tags: ["TypeScript", "类型系统"]
description: "深入探索 TypeScript 的高级类型特性，包括条件类型、模板字面量类型和递归类型。"
cover: ""
author: "Jason Wang"
---

## 引言

TypeScript 的类型系统是图灵完备的，这意味着你可以用它来表达任意复杂的类型约束。本文将通过实战示例展示高级类型的应用。

## 条件类型

条件类型是 TypeScript 最强大的特性之一：

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<42>;      // false
```

## 模板字面量类型

TypeScript 4.1 引入的模板字面量类型让你可以在类型层面拼接字符串：

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<"click">; // "onClick"
```

## 递归类型

配合条件类型，可以创建递归的类型定义：

```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};
```

## 实战案例：类型安全的路由

```typescript
type Route =
  | { path: "/"; params: {} }
  | { path: "/user/[id]"; params: { id: string } }
  | { path: "/post/[slug]"; params: { slug: string } };

function navigate<T extends Route["path"]>(
  path: T,
  params: Extract<Route, { path: T }>["params"]
) {
  // ...
}

navigate("/user/[id]", { id: "123" }); // ✅
navigate("/user/[id]", { slug: "abc" }); // ❌ 类型错误
```

## 总结

TypeScript 的高级类型让你可以在编译时捕获更多错误，提升代码质量和开发效率。
