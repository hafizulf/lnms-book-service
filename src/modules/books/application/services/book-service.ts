import { ConflictException, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateBookRequestDto, CreateBookResponseDto } from "../../interface/http/dto/create-book.dto";
import { CreateBookCommand } from "../command/impl/create-book.command";
import { TransformerResponse } from "src/modules/common/helpers/transformer.helper";
import { ERROR_MESSAGES } from "src/modules/common/constants/error-message.constant";
import { FindBookByIsbnQuery } from "../query/impl/find-book-by-isbn.query";

@Injectable()
export class BookService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async createBook(
    bookData: CreateBookRequestDto,
  ): Promise<CreateBookResponseDto> {
    const findBookByIsbn = await this.queryBus.execute(
      new FindBookByIsbnQuery(bookData.isbn),
    );

    if (findBookByIsbn) {
      throw new ConflictException(ERROR_MESSAGES.BOOK_ALREADY_EXISTS);
    }

    const createdBooks = await this.commandBus.execute(
      new CreateBookCommand(bookData)
    );

    return TransformerResponse.transform(createdBooks, CreateBookResponseDto);
  }
}
