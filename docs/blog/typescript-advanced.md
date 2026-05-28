---
title: TypeScript 高级类型系统完全指南
description: 掌握泛型、条件类型、映射类型与模板字面量类型，提升 TypeScript 建模能力。
---

# TypeScript 高级类型系统完全指南

TypeScript 的高级类型不是炫技工具，而是用来表达业务约束的建模语言。写得好的类型可以提前暴露错误，也能让编辑器补全更贴近真实业务。

## 泛型

泛型用于保留输入和输出之间的关系。

```ts
function pick<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { id: 1, name: 'findbys' }
const name = pick(user, 'name')
```

## 条件类型

条件类型可以根据类型关系分支，常用于工具类型。

```ts
type ApiResponse<T> = T extends Error
  ? { ok: false; error: string }
  : { ok: true; data: T }
```

## 映射类型

映射类型可以批量转换对象属性。

```ts
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}

type Nullable<T> = {
  [K in keyof T]: T[K] | null
}
```

## 模板字面量类型

它适合表达具有固定格式的字符串，比如事件名、接口路径和 CSS 变量。

```ts
type EventName<T extends string> = `on${Capitalize<T>}`

type ClickEvent = EventName<'click'>
```

## 实战建议

高级类型应该服务于可读性。团队里如果大多数人无法快速理解某个类型，就应该考虑拆分命名、增加中间类型，或者降低抽象程度。

## 总结

TypeScript 类型系统的目标是让代码更可靠。掌握泛型、条件类型和映射类型之后，可以把很多运行时约束提前到编译阶段。
