// export class BookResponseDto {
//   id: number;
//   isbn: string;
//   name: string;
//   year: number;
//   author: string;
//   created_at: string;
//   updated_at: string;
// }

import { Expose } from 'class-transformer';

export class BookResponseDto {
  @Expose()
  id: number;

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

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
