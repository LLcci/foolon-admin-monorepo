# 定时任务

定时任务可使用 NestJS 的 [任务调度](https://nest.nodejs.cn/techniques/task-scheduling) 或 [队列](https://nest.nodejs.cn/techniques/queues) 进行实现。

foolon admin 采用 [队列](https://nest.nodejs.cn/techniques/queues) 进行实现。

相关代码在`/api/src/admin/system/task/`。

## 定时任务管理

项目启动后，可在`系统管理-定时任务`中查看定时任务。

## 动态定时任务方法

可参考[动态消费者](/apiDoc/queue#动态消费者)
