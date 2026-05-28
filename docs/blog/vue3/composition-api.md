---
title: Vue3 Composition API 深度实践指南
description: 从原理到实战，系统掌握 Vue3 Composition API、自定义 Hooks 与响应式设计。
---

# Vue3 Composition API 深度实践指南

Composition API 的价值不只是换一种写法，而是让业务逻辑可以围绕“能力”组织。复杂页面里的表单、列表、权限、请求、缓存和交互状态，都能拆成清晰的组合函数，再按页面需要自由拼装。

## 适合拆分的逻辑

当一段逻辑同时满足下面几个特征时，就很适合抽成 composable：

- 多个组件会复用。
- 需要维护响应式状态。
- 包含生命周期、请求、副作用或事件监听。
- 模板只关心结果，不关心内部实现。

```ts
import { ref, computed } from 'vue'

export function usePagination(total: number, pageSize = 10) {
  const page = ref(1)
  const maxPage = computed(() => Math.max(1, Math.ceil(total / pageSize)))

  function next() {
    page.value = Math.min(page.value + 1, maxPage.value)
  }

  function prev() {
    page.value = Math.max(page.value - 1, 1)
  }

  return { page, maxPage, next, prev }
}
```

## 响应式选择

`ref` 更适合基础类型、可整体替换的数据和对外暴露的状态；`reactive` 更适合复杂对象内部字段频繁变更的场景。团队实践里可以优先使用 `ref`，因为它在解构、传参和组合函数返回值中更稳定。

## 自定义 Hooks 的边界

一个好的 composable 应该像一个小模块：输入明确，输出明确，不暗中依赖页面上下文。比如 `useUserList` 可以负责请求、筛选和分页，但不要同时处理弹窗、路由跳转和埋点。

```ts
export function useAsyncData<T>(loader: () => Promise<T>) {
  const data = ref<T>()
  const loading = ref(false)
  const error = ref<unknown>(null)

  async function run() {
    loading.value = true
    error.value = null
    try {
      data.value = await loader()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, run }
}
```

## 组件实践建议

页面组件保留“编排”职责，组合函数负责“能力”职责。这样页面阅读起来会像一份业务流程说明，而不是一大团状态和副作用。

::: tip 实践经验
不要为了拆分而拆分。只有当逻辑有明确边界、复用价值或可测试价值时，抽象才真正值得。
:::

## 总结

Composition API 的核心是让逻辑具备可组合性。把状态、计算、行为和副作用收束在合适的 composable 中，Vue3 项目的长期维护成本会明显下降。
