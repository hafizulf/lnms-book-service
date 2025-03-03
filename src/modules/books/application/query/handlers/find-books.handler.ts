import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindBooksQuery } from "../impl/find-books.query";
import { Book } from "src/modules/books/domain/models/book.model";
import { Inject } from "@nestjs/common";
import { REPOSITORY_TYPES } from "src/modules/books/infrastructure/database/repositories/repository.types";
import { BookRepository } from "src/modules/books/infrastructure/database/repositories/book.repository";

@QueryHandler(FindBooksQuery)
export class FindBooksHandler
  implements IQueryHandler<FindBooksQuery, Book[]>
{
  constructor(
    @Inject(REPOSITORY_TYPES.repositories.BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  async execute(_query: FindBooksQuery): Promise<Book[]> {
    return await this.bookRepository.findBooks();
  }
}
