import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { FindBooksQuery } from "../query/impl/find-books.query";
import { Book } from "../../domain/models/book.model";
import { BookResponseDto } from "../../interface/grpc/dto/book-response.dto";
import { TransformerResponse } from "src/modules/common/helpers/transformer";
import { FindBooksResponseDto } from "../../interface/grpc/dto/find-books-response.dto";

@Injectable()
export class BookRpcService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
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
}
