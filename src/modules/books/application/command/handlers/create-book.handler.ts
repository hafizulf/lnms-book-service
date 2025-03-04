import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateBookCommand } from "../impl/create-book.command";
import { Book } from "src/modules/books/domain/models/book.model";
import { Inject } from "@nestjs/common";
import { REPOSITORY_TYPES } from "src/modules/books/infrastructure/database/repositories/repository.types";
import { BookRepository } from "src/modules/books/infrastructure/database/repositories/book.repository";

@CommandHandler(CreateBookCommand)
export class CreateBookHandler
implements ICommandHandler<CreateBookCommand, Book> {
  constructor(
    @Inject(REPOSITORY_TYPES.repositories.BookRepository)
    private readonly _bookRepository: BookRepository,
  ) {}

  async execute(command: CreateBookCommand): Promise<Book> {
    const book = Book.create(command.bookData);

    return await this._bookRepository.createBook(book);
  }
}
