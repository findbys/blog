---
title: Vite 构建优化全攻略
description: 系统梳理 Vite 项目的构建优化方法，包括代码分割、依赖预构建、资源压缩与缓存策略。
---

# Vite 构建优化全攻略

Vite 的开发体验很快，但生产构建依然需要认真治理。真正影响线上体验的，通常是首屏资源体积、异步 chunk 划分、缓存命中率和第三方依赖体积。

## 分析构建产物

优化前先分析，不要凭感觉改配置。可以引入可视化工具查看依赖体积和 chunk 关系。

```ts
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default {
  plugins: [
    visualizer({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
}
```

## 路由级代码分割

业务页面应尽量使用动态导入，让首屏只加载必要代码。

```ts
const routes = [
  {
    path: '/dashboard',
    component: () => import('./pages/Dashboard.vue'),
  },
]
```

## 拆分第三方依赖

对大型依赖进行合理分包，可以提升缓存利用率，也能避免业务代码每次发布都让 vendor chunk 失效。

```ts
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          charts: ['echarts'],
        },
      },
    },
  },
}
```

## 静态资源优化

图片优先使用合适尺寸和现代格式。对于字体、图标、首屏背景等资源，要避免一次性加载过多。能够懒加载的媒体资源，不要进入首屏关键路径。

## 缓存策略

带 hash 的静态资源可以设置长缓存，入口 HTML 保持短缓存或不缓存。这样既能充分利用浏览器缓存，又能保证新版本及时生效。

## 总结

Vite 优化不是堆配置，而是围绕真实瓶颈做取舍。先分析，再拆包，最后结合缓存和压缩策略，才能稳定提升线上加载体验。
