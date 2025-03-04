import { Module } from '@nestjs/common';
import { BookRpcController } from './interface/grpc/controller/book-rpc.controller';
import { BookRpcService } from './application/services/book-rpc.service';
import { REPOSITORY_TYPES } from './infrastructure/database/repositories/repository.types';
import { BookRepositoryImpl } from './infrastructure/database/repositories/book.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './infrastructure/database/entities/book.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './application/query/handlers';
import { BookController } from './interface/http/controller/book-controller';
import { BookService } from './application/services/book-service';
import { CommandHandlers } from './application/command/handlers';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    CqrsModule,
  ],
  controllers: [
    BookRpcController,
    BookController,
  ],
  providers: [
    {
      provide: REPOSITORY_TYPES.repositories.BookRepository,
      useClass: BookRepositoryImpl,
    },
    ...QueryHandlers,
    ...CommandHandlers,
    BookRpcService,
    BookService,
  ],
})
export class BookModule {}
