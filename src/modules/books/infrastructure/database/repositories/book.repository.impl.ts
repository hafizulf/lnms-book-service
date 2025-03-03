import { Injectable } from "@nestjs/common";
import { BookRepository } from "./book.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { BookEntity } from "../entities/book.entity";
import { Repository } from "typeorm";
import { Book } from "src/modules/books/domain/models/book.model";

@Injectable()
export class BookRepositoryImpl implements BookRepository {
  constructor(
    @InjectRepository(BookEntity)
    readonly bookRepository: Repository<BookEntity>,
  ) {}

  async findBooks(): Promise<Book[]> {
    const books = await this.bookRepository.find();

    return books.map((entity) => Book.fromEntity(entity));
  }
}
