---
title: Pinia 完全指南：Vue3 状态管理新标准
description: 深入解析 Pinia 的设计理念、Store 拆分、持久化与复杂业务实践。
---

# Pinia 完全指南：Vue3 状态管理新标准

Pinia 是 Vue3 生态中更轻、更自然的状态管理方案。它保留了集中式状态的可维护性，同时减少了 Vuex 时代的模板代码。

## Store 设计

Store 应该围绕业务领域拆分，而不是围绕页面拆分。比如用户信息、购物车、权限、主题配置都可以是独立 Store。

```ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    profile: null as null | { name: string },
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.token),
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
  },
})
```

## Setup Store

Setup Store 更接近 Composition API，适合逻辑较复杂、需要组合其他 composable 的场景。

```ts
export const useThemeStore = defineStore('theme', () => {
  const mode = ref<'light' | 'dark'>('dark')
  const isDark = computed(() => mode.value === 'dark')

  function toggle() {
    mode.value = isDark.value ? 'light' : 'dark'
  }

  return { mode, isDark, toggle }
})
```

## 持久化

登录态、主题、用户偏好可以持久化，但接口缓存和临时表单状态不一定适合。持久化越多，越要注意版本迁移和数据过期。

## 实践建议

Store 中保留跨组件共享状态，组件私有状态仍然放在组件内部。不要把 Pinia 当成所有状态的唯一归宿。

## 总结

Pinia 的优势在于简单和类型友好。只要 Store 边界设计得当，它可以让 Vue3 项目的状态管理保持清爽。
