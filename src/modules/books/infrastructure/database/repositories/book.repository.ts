import { Book } from "src/modules/books/domain/models/book.model";

export interface BookRepository {
  findBooks(): Promise<Book[]>;
  findByIsbn(isbn: string): Promise<Book | null>;
  createBook(book: Book): Promise<Book>;
}
