import { AdminModule } from './admin/admin.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ElasticsearchModule } from '@/global/elasticsearch/elasticsearch.module';
import { RedisModule } from '@/global/redis/redis.module';
import { LoggerModule } from '@/global/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
    LoggerModule,
    AdminModule,
    ElasticsearchModule.forRoot({
      node: process.env.ES_HOST,
      apiKey: process.env.ES_APIKEY,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      logging: true,
      synchronize: process.env.NODE_ENV == 'production' ? false : true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    RedisModule.forRoot({
      url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${process.env.REDIS_DB}`,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
