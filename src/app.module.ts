import { Logger, MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { BookModule } from './modules/books/book.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvValidationOptions, EnvValidationSchema } from './config/env-validation.config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/orm.config';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvValidationSchema,
      validationOptions: EnvValidationOptions,
      envFilePath: [`.env.${process.env.NODE_ENV || 'local'}`, '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ormConfig(configService),
      inject: [ConfigService],
    }),
    BookModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule, OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  async onModuleInit() {
    if (this.dataSource.isInitialized) {
      this.logger.log('Database connection established successfully');
    } else {
      this.logger.error('Failed to establish database connection');
    }
  }
}
