import { Injectable } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { FindBooksQuery } from "../query/impl/find-books.query";
import { Book } from "../../domain/models/book.model";
import { BookResponseDto } from "../../interface/grpc/dto/book-response.dto";
import { TransformerResponse } from "src/modules/common/helpers/transformer.helper";
import { FindBooksResponseDto } from "../../interface/grpc/dto/find-books-response.dto";
import { FindBookByIsbnQuery } from "../query/impl/find-book-by-isbn.query";
import { RpcException } from "@nestjs/microservices";
import { status } from "@grpc/grpc-js";

@Injectable()
export class BookRpcService {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  async findBooks(_request: {}): Promise<FindBooksResponseDto> {
    const books = await this.queryBus.execute(
      new FindBooksQuery(),
    )

    const transformedDataBooks = books.map((book: Book) => {
      return TransformerResponse.transform(book, BookResponseDto);
    });

    return {
      books: transformedDataBooks,
    };
  }

  async findBookByIsbn(isbn: string): Promise<BookResponseDto> {
    const book = await this.queryBus.execute(
      new FindBookByIsbnQuery(isbn),
    )

    if (!book) {
      console.log('Book not found');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Book not found',
      });
    }

    return TransformerResponse.transform(book, BookResponseDto);
  }
}
