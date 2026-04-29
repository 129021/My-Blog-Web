---
title: "Framer Motion 动效完全指南"
date: "2026-04-05"
category: "前端开发"
tags: ["React", "动画", "Framer Motion"]
description: "从基础到高级，全面掌握 Framer Motion 的动画技巧，让你的 React 应用动起来。"
cover: ""
author: "Jason Wang"
---

## 为什么选择 Framer Motion

Framer Motion 是 React 生态中最强大的动画库。它提供了声明式 API、物理弹簧动画和手势支持。

## 基础动画

```tsx
import { motion } from "framer-motion";

function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      Hello Motion!
    </motion.div>
  );
}
```

## 滚动动画

使用 `useInView` 或 `whileInView` 可以轻松实现滚动触发：

```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5 }}
>
  我出现时会从下方淡入
</motion.div>
```

## 布局动画

`layout` prop 让元素在位置/大小变化时自动平滑过渡：

```tsx
<motion.div layout>
  {/* 内容变化时自动动画 */}
</motion.div>
```

## 手势系统

```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  drag="x"
  dragConstraints={{ left: 0, right: 100 }}
>
  拖拽我
</motion.div>
```

## 性能建议

- 优先动画 `transform` 和 `opacity`，避免触发重排
- 使用 `useReducedMotion` 尊重用户的系统偏好
- 复杂动画使用 `useAnimationControls` 进行编排
