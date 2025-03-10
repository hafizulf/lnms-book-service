import { Body, Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, UnprocessableEntityException, UploadedFile, UseInterceptors } from "@nestjs/common";
import { BookRpcService } from "src/modules/books/application/services/book-rpc.service";
import { ResponseDto } from "src/modules/common/dto/response.dto";
import { CreateBookRequestDto, CreateBookResponseDto } from "../dto/create-book.dto";
import { BookService } from "src/modules/books/application/services/book-service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { FILE_UPLOAD } from "src/modules/common/constants/file.constants";
import { unlink, rename } from 'fs/promises';
import { unlinkSync } from "fs";
import { FindBookByIsbnRequestDto } from "../../grpc/dto/find-one-book.dto";

@Controller('books')
export class BookController {
  constructor(
    private readonly _bookRpcService: BookRpcService,
    private readonly _bookService: BookService,
  ) {}

  @Get('/:isbn')
  async findBookByIsbn(request: FindBookByIsbnRequestDto) {
    console.log(request);
    const data = await this._bookRpcService.findBookByIsbn(request.isbn);

    return {
      statusCode: 200,
      message: 'Data has been successfully retrieved',
      data,
    };
  }

  @Get()
  async findBooks() {
    const data = await this._bookRpcService.findBooks({});

    return {
      statusCode: 200,
      message: 'Data has been successfully retrieved',
      data: data.books,
    };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${FILE_UPLOAD.UPLOAD_PATH_TEMP}`, // Store in temp folder first
        filename: (_req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname) || ''; // Ensure extension is preserved
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: { files: 1 },
    }),
  )
  async createBook(
    @Body() request: CreateBookRequestDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: FILE_UPLOAD.ALLOWED_MIME_TYPES.join('|'),
        })
        .addMaxSizeValidator({
          maxSize: FILE_UPLOAD.MAX_FILE_SIZE,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          exceptionFactory: (
            errorMessage: string,
            file?: Express.Multer.File,
          ) => {
            if (file?.path) {
              try {
                unlinkSync(file.path);
              } catch (err) {
                console.error('Failed to delete temp file:', err);
              }
            }
            return new UnprocessableEntityException({
              statusCode: 422,
              message: 'Validation errors',
              errors: [
                {
                  field: 'file',
                  constraints: { validation: errorMessage },
                },
              ],
            });
          },
        }),
    )
    file: Express.Multer.File,
  ): Promise<ResponseDto<CreateBookResponseDto>> {
    let finalPath: string | undefined = undefined;

    try {
      console.log(file);

      // Run business logic first (e.g., create a database entry)
      const data = await this._bookService.createBook(request, file.filename);

      // Only after successful business logic, move the file from temp to final directory
      finalPath = join(FILE_UPLOAD.UPLOAD_PATH_FINAL, file.filename);
      await rename(file.path, finalPath);

      return {
        statusCode: 201,
        message: 'Data has been successfully created',
        data,
      };
    } catch (error) {
      // Clean up both the temporary and final locations if needed
      await Promise.all([
        unlink(file.path).catch(() => null),
        finalPath ? unlink(finalPath).catch(() => null) : Promise.resolve(),
      ]);
      throw error;
    }
  }
}
