import { Module } from '@nestjs/common';
import { BookRpcController } from './interface/grpc/controller/book-rpc.controller';
import { BookRpcService } from './application/services/book-rpc.service';
import { REPOSITORY_TYPES } from './infrastructure/database/repositories/repository.types';
import { BookRepositoryImpl } from './infrastructure/database/repositories/book.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './infrastructure/database/entities/book.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './application/query/handlers';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    CqrsModule,
  ],
  controllers: [
    BookRpcController,
  ],
  providers: [
    {
      provide: REPOSITORY_TYPES.repositories.BookRepository,
      useClass: BookRepositoryImpl,
    },
    ...QueryHandlers,
    BookRpcService,
  ],
})
export class BookModule {}
