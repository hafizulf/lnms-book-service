import { AggregateRoot } from "@nestjs/cqrs";
import { BookEntity } from "../../infrastructure/database/entities/book.entity";

export class Book extends AggregateRoot {
  private readonly _id?: number;
  private _isbn: string;
  private _name: string;
  private _year: number;
  private _author: string;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(id?: number) {
    super();
    this._id = id;
  }

  public static fromEntity(entity: BookEntity): Book {
    const book = new Book(entity.id);

    book._isbn = entity.isbn;
    book._name = entity.name;
    book._year = entity.year;
    book._author = entity.author;
    book._created_at = entity.created_at;
    book._updated_at = entity.updated_at;

    return book;
  }

  toEntity(): BookEntity {
    const entity = new BookEntity();

    if (this._id !== undefined) {
      entity.id = this._id;
    }
    entity.isbn = this._isbn;
    entity.name = this._name;
    entity.year = this._year;
    entity.author = this._author;
    entity.created_at = this._created_at;
    entity.updated_at = this._updated_at;

    return entity;
  }

  get id(): number | undefined {
    return this._id;
  }

  get isbn(): string {
    return this._isbn;
  }

  get name(): string {
    return this._name;
  }

  get year(): number {
    return this._year;
  }

  get author(): string {
    return this._author;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date {
    return this._updated_at;
  }

  // setter
  set isbn(value: string) {
    this._isbn = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set year(value: number) {
    this._year = value;
  }

  set author(value: string) {
    this._author = value;
  }

  set created_at(value: Date) {
    this._created_at = value;
  }

  set updated_at(value: Date) {
    this._updated_at = value;
  }
}
