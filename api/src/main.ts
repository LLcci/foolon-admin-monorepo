import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from '@/global/logger/logger.service';
import { LoggerInterceptor } from '@/global/logger/logger.interceptor';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import fs from 'fs';
import compression from 'compression';
import express from 'express';
import { RedisIoAdapter } from './socket/RedisIoAdapter';
import expressListRoutes from 'express-list-routes';
import { RedisService } from './global/redis/redis.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });
  const logger = app.get(LoggerService);
  app.useGlobalInterceptors(new LoggerInterceptor(logger));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(
          errors
            .filter((item) => !!item.constraints)
            .flatMap((item) => Object.values(item.constraints))
            .join('; '),
        );
      },
    }),
  );
  app.use(compression());
  app.use(express.static('./upload'));

  // socket.io配置
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  // swagger配置
  if (process.env.NODE_ENV != 'production') {
    const options = new DocumentBuilder()
      .setTitle('foolon-admin')
      .setDescription('使用nestjs开发的后台管理系统')
      .build();
    const documents = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger-api', app, documents);
    fs.writeFileSync('./swagger-spec.json', JSON.stringify(documents));
  }
  app.enableCors({ origin: '*' });
  await app.listen(process.env.SERVER_PORT, '0.0.0.0');
  const serverUrl = await app.getUrl();
  logger.log(`api服务已经启动,请访问: ${serverUrl}`);
  logger.log(`ws服务已启动,请访问：http://127.0.0.1:${process.env.WS_PORT}/ws`);
  if (process.env.NODE_ENV != 'production') {
    logger.log(`api文档地址: ${serverUrl}/swagger-api`);
  }
  const server = app.getHttpServer();
  const routes = expressListRoutes(server._events.request._router)
    .map((item) => item.path.replace(/\\/g, '/'))
    .filter((item) => !item.includes('/swagger-api'));
  const redis = app.get(RedisService);
  redis.client.set(`${process.env.REDIS_PREFIX}routes`, routes.join(','));
}
bootstrap();
