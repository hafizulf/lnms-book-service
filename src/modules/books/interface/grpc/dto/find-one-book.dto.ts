import { IsNotEmpty, IsString } from "class-validator";
import { BookResponseDto } from "./book-response.dto";

export class FindBookByIsbnRequestDto {
  @IsNotEmpty({ message: 'ISBN is required' })
  @IsString({ message: 'ISBN must be a string' })
  isbn: string;
}

export class FindBookByIsbnResponseDto {
  book: BookResponseDto;
}
