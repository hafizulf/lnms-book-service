import { ClassConstructor, plainToInstance } from "class-transformer";

export class TransformerResponse {
  static transform<T>(data: any, dto: ClassConstructor<T>): T {
    const transformed = plainToInstance(dto, data, {
      excludeExtraneousValues: true,
    });
    return transformed;
  }
}
