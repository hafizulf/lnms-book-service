import { Body, Controller, Get, Post } from "@nestjs/common";
import { BookRpcService } from "src/modules/books/application/services/book-rpc.service";
import { ResponseDto } from "src/modules/common/dto/response.dto";
import { CreateBookRequestDto, CreateBookResponseDto } from "../dto/create-book.dto";
import { BookService } from "src/modules/books/application/services/book-service";

@Controller('books')
export class BookController {
  constructor(
    private readonly _bookRpcService: BookRpcService,
    private readonly _bookService: BookService,
  ) {}

  @Get()
  async findBooks() {
    const data = await this._bookRpcService.findBooks({ });

    return {
      statusCode: 200,
      message: 'Data has been successfully retrieved',
      data: data.books,
    }
  }

  @Post()
  async createBook(
    @Body() request: CreateBookRequestDto,
  ):  Promise<ResponseDto<CreateBookResponseDto>> {
    const data = await this._bookService.createBook(request);

    return {
      statusCode: 201,
      message: 'Data has been successfully created',
      data,
    }
  }
}
