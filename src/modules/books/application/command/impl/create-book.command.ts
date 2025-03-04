export class CreateBookCommand {
  constructor(public readonly bookData: {
    isbn: string;
    name: string;
    year: number;
    author: string;
  }) {}
}
