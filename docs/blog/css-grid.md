---
title: CSS Grid 布局完全指南
description: 从基础到实战，掌握 CSS Grid 二维布局、响应式网格与常见页面结构。
---

# CSS Grid 布局完全指南

CSS Grid 是浏览器原生的二维布局系统，特别适合页面框架、卡片列表、仪表盘和复杂内容区域。相比 flex，它可以同时控制行和列。

## 基础网格

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
```

`fr` 表示可用空间的份额，`gap` 用来统一控制网格间距。

## 响应式布局

使用 `auto-fit` 和 `minmax` 可以快速实现自适应卡片布局。

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}
```

## 区域命名

复杂页面可以用 `grid-template-areas` 提升可读性。

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 240px 1fr;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
```

## Grid 与 Flex 的选择

一维排列优先 flex，二维布局优先 grid。比如导航栏按钮排列适合 flex，整个后台页面结构更适合 grid。

## 总结

CSS Grid 让复杂布局更直接。掌握列、行、区域和响应式函数后，大多数页面结构都可以用更少代码完成。
