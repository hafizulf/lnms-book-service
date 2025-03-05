import { Expose, Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookRequestDto {
  @IsNotEmpty()
  isbn: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  year: number;

  @IsNotEmpty()
  author: string;
}

export class CreateBookModelDto {
  isbn: string;
  name: string;
  year: number;
  author: string;
  filename: string;
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

  @Expose()
  filename: string;
}
