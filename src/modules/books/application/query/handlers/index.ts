import { FindBookByIsbnHandler } from "./find-book-by-isbn.handler";
import { FindBooksHandler } from "./find-books.handler";

export const QueryHandlers = [
  FindBooksHandler,
  FindBookByIsbnHandler,
];
