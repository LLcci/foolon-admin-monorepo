# 队列

NestJS 集成 [BullMQ](https://docs.bullmq.io/) 和 [Bull](https://github.com/OptimalBits/bull/blob/master/REFERENCE.md) 提供了 [队列](https://nest.nodejs.cn/techniques/queues) 的功能。

foolon admin 使用 [BullMQ](https://docs.bullmq.io/) 方式。

相关代码在`/api/src/admin/system/queues/`。

## 队列管理

项目启动后，可在`系统管理-队列管理`中查看队列信息。

## 动态消费者

在`/api/src/admin/system/queues/quques.consumer.ts`中定义消费者方法，在管理系统中`系统管理-队列管理`创建工作时，即可选择该方法。
