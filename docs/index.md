---
layout: home
title: findbys | 全栈工程师个人博客
description: findbys的技术博客 - 分享 Vue3、Flutter、工程化等技术干货，5年+全栈开发经验
---

<HomeHero />

<SkillSection />

<script setup>
import { ref } from 'vue'

const recentPosts = [
  {
    title: 'Vue3 Composition API 深度实践指南',
    excerpt: '从原理到实战，全面掌握 Vue3 组合式 API，包含自定义 Hooks 封装、响应式原理解析等核心内容。',
    link: '/blog/vue3/composition-api',
    category: 'Vue3',
    color: '#42b883',
    tags: ['Vue3', 'Composition API', 'Hooks'],
    date: '2024-12-15',
    readTime: '12 min',
  },
  {
    title: 'Flutter BLoC 状态管理最佳实践',
    excerpt: '深入讲解 BLoC 模式在 Flutter 项目中的应用，含架构设计、事件处理和测试策略。',
    link: '/blog/flutter/bloc-pattern',
    category: 'Flutter',
    color: '#54c5f8',
    tags: ['Flutter', 'BLoC', 'Dart'],
    date: '2024-12-01',
    readTime: '15 min',
  },
  {
    title: 'Vite 构建优化全攻略',
    excerpt: '系统梳理 Vite 5 构建优化方案，从代码分割、懒加载到 CDN 引入和 Gzip 压缩。',
    link: '/blog/engineering/vite-optimize',
    category: '工程化',
    color: '#bd34fe',
    tags: ['Vite', '性能优化', '构建'],
    date: '2024-11-20',
    readTime: '10 min',
  },
  {
    title: 'TypeScript 高级类型系统完全指南',
    excerpt: '从泛型到条件类型、映射类型、模板字面量类型，全面掌握 TS 高级特性。',
    link: '/blog/typescript-advanced',
    category: 'TypeScript',
    color: '#3178c6',
    tags: ['TypeScript', '类型系统', '泛型'],
    date: '2024-11-10',
    readTime: '18 min',
  },
  {
    title: 'uni-app 多端开发避坑指南',
    excerpt: '总结 uni-app 在 H5、App、小程序三端开发中的常见问题与解决方案。',
    link: '/blog/uniapp-guide',
    category: '跨端开发',
    color: '#00bcd4',
    tags: ['uni-app', '小程序', 'H5'],
    date: '2024-10-28',
    readTime: '14 min',
  },
  {
    title: 'Node.js 构建高性能 RESTful API',
    excerpt: '使用 Express + TypeScript + Prisma 构建企业级 RESTful API，含鉴权、限流和日志。',
    link: '/blog/nodejs-restful-api',
    category: 'Node.js',
    color: '#68a063',
    tags: ['Node.js', 'Express', 'API'],
    date: '2024-10-15',
    readTime: '16 min',
  },
]
</script>

<div class="home-blog-section">
  <div class="section-header">
    <div class="section-tag">LATEST POSTS</div>
    <h2 class="section-title">最新文章</h2>
    <p class="section-sub">持续输出技术干货，记录成长历程</p>
  </div>
  <BlogList :posts="recentPosts" />
  <div class="view-all-wrap">
    <a href="/blog/" class="view-all-btn">查看全部文章 →</a>
  </div>
</div>

<div class="home-footer-cta">
  <div class="cta-content">
    <h2>一起探索技术的边界</h2>
    <p>开放合作，欢迎交流 · 共同进步</p>
    <div class="cta-actions">
      <a href="/about" class="btn-primary">了解更多</a>
      <a href="/tutorials/" class="btn-secondary">查看教程</a>
    </div>
  </div>
</div>

<style>
.home-blog-section {
  max-width: 1152px;
  margin: 0 auto;
  padding: 4rem 1.5rem 3rem;
}

.view-all-wrap {
  text-align: center;
  margin-top: 2rem;
}

.view-all-btn {
  display: inline-block;
  padding: 10px 28px;
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 99px;
  color: var(--c-brand-primary);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.view-all-btn:hover {
  background: rgba(0, 212, 255, 0.08);
  transform: translateX(3px);
}

.home-footer-cta {
  background: linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(123,47,255,0.06) 100%);
  border-top: 1px solid var(--c-border-subtle);
  padding: 5rem 1.5rem;
  text-align: center;
}

.cta-content h2 {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00d4ff, #7b2fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
  border: none !important;
  padding: 0 !important;
}

.cta-content h2::before { display: none !important; }

.cta-content p {
  color: var(--c-text-muted);
  margin-bottom: 1.75rem;
}

.cta-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.VPHome {
  padding-bottom: 0 !important;
}
</style>
