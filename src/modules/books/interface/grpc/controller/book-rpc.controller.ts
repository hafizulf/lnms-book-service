import { Controller } from "@nestjs/common";
import { GrpcMethod, RpcException } from "@nestjs/microservices";
import { BookRpcService } from "src/modules/books/application/services/book-rpc.service";
import { FindBooksResponseDto } from "../dto/find-books-response.dto";
import { FindBookByIsbnRequestDto, FindBookByIsbnResponseDto } from "../dto/find-one-book.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { status } from "@grpc/grpc-js";

@Controller()
export class BookRpcController {
  constructor(private readonly bookRpcService: BookRpcService) {}

  @GrpcMethod('BookService', 'FindBooks')
  async findBooks(request: {}): Promise<FindBooksResponseDto> {
    return await this.bookRpcService.findBooks(request);
  }

  @GrpcMethod('BookService', 'FindBookByIsbn')
  async findBookByIsbn(
    request: FindBookByIsbnRequestDto,
  ): Promise<FindBookByIsbnResponseDto> {
    const dtoInstance = plainToInstance(FindBookByIsbnRequestDto, request);

    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'Invalid request payload',
        details: errors
          .map((err) => Object.values(err.constraints ?? {})) // Handle undefined case
          .flat(),
      });
    }

    const data = await this.bookRpcService.findBookByIsbn(request.isbn);

    return  { book: data };
  }
}
