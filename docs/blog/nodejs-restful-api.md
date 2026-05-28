---
title: Node.js 构建高性能 RESTful API
description: 使用 Express、TypeScript 与 Prisma 构建可维护的企业级 RESTful API。
---

# Node.js 构建高性能 RESTful API

一个可靠的 RESTful API 不只是能返回数据，还要在鉴权、校验、错误处理、日志、限流和可观测性上形成完整闭环。

## 项目分层

常见结构可以分为 Router、Controller、Service、Repository 四层：

- Router 负责路由注册。
- Controller 负责参数读取和响应。
- Service 负责业务规则。
- Repository 负责数据库访问。

## 参数校验

不要让脏数据进入业务层。可以使用 Zod 这类 schema 工具统一校验请求参数。

```ts
import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

const payload = createUserSchema.parse(req.body)
```

## 统一错误处理

错误处理应该集中在全局 middleware 中，业务代码只需要抛出明确错误。

```ts
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode ?? 500).json({
    message: err.message ?? 'Internal Server Error',
  })
})
```

## 性能重点

高性能 API 的关键通常不是单行代码优化，而是数据库索引、缓存策略、分页设计、连接池配置和慢查询治理。

## 安全建议

生产环境至少要考虑鉴权、限流、CORS、Helmet、安全日志和敏感字段过滤。接口文档也应与代码保持同步，避免前后端协作时出现隐性契约。

## 总结

Node.js 很适合构建高吞吐 API，但项目规模上来后，工程边界比框架选择更重要。清晰分层和统一治理能让接口长期稳定演进。
