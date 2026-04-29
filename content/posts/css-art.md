---
title: "纯 CSS 实现赛博朋克风格 UI"
date: "2026-04-10"
category: "前端开发"
tags: ["CSS", "UI设计", "动画"]
description: "不依赖任何库，使用纯 CSS 实现赛博朋克风格的视觉效果，包括霓虹灯、扫描线和故障效果。"
cover: ""
author: "Jason Wang"
---

## 设计理念

赛博朋克（Cyberpunk）风格以高对比度、霓虹灯光、暗色背景和科技感为核心。本文将演示如何用纯 CSS 实现这些效果。

## 霓虹灯效果

```css
.neon-text {
  color: #fff;
  text-shadow:
    0 0 7px #22d3ee,
    0 0 10px #22d3ee,
    0 0 21px #22d3ee,
    0 0 42px #0ea5e9;
}
```

## 扫描线效果

使用 repeating-linear-gradient 可以轻松创建扫描线纹理：

```css
.scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.1) 2px,
    rgba(0, 0, 0, 0.1) 4px
  );
}
```

## 故障动画

```css
@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

.glitch:hover {
  animation: glitch 0.3s infinite;
}
```

> CSS 是一门被严重低估的语言。它的表现力远超大多数人的想象。

## 组合效果

将以上所有效果组合起来，一个完整的赛博朋克卡片就诞生了——霓虹边框、扫描线背景、故障文字，全部用纯 CSS 实现。
