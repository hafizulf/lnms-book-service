export class ResponseDto<T> {
  constructor(
    readonly statusCode: number,
    readonly message: string,
    readonly data?: T,
  ) {}
}
