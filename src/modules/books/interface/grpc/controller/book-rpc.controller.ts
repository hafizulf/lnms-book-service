import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { BookRpcService } from "src/modules/books/application/services/book-rpc.service";
import { FindBooksResponseDto } from "../dto/find-books-response.dto";

@Controller()
export class BookRpcController {
  constructor(
    private readonly bookRpcService: BookRpcService,
  ) {}

  @GrpcMethod("BookService", "FindBooks")
  async findBooks(request: {}): Promise<FindBooksResponseDto> {
    return await this.bookRpcService.findBooks(request);
  }
}
