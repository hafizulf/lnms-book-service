import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookRequestDto {
  @IsNotEmpty()
  isbn: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  author: string;
}

export class CreateBookResponseDto {
  @Expose()
  id: number

  @Expose()
  isbn: string;

  @Expose()
  name: string;

  @Expose()
  year: number;

  @Expose()
  author: string;
}
