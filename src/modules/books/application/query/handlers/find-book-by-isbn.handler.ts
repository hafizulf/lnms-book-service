import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindBookByIsbnQuery } from "../impl/find-book-by-isbn.query";
import { Book } from "src/modules/books/domain/models/book.model";
import { BookRepository } from "src/modules/books/infrastructure/database/repositories/book.repository";
import { Inject } from "@nestjs/common";
import { REPOSITORY_TYPES } from "src/modules/books/infrastructure/database/repositories/repository.types";

@QueryHandler(FindBookByIsbnQuery)
export class FindBookByIsbnHandler
implements IQueryHandler<FindBookByIsbnQuery, Book | null>  {
  constructor(
    @Inject(REPOSITORY_TYPES.repositories.BookRepository)
    private readonly _bookRepository: BookRepository,
  ) {}

  async execute(query: FindBookByIsbnQuery): Promise<Book | null> {
    return await this._bookRepository.findByIsbn(query.isbn);
  }
}
