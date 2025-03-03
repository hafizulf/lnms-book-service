import { Book } from "src/modules/books/domain/models/book.model";

export interface BookRepository {
  findBooks(): Promise<Book[]>;
}
