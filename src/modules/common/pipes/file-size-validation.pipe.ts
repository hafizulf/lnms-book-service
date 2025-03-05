import { PipeTransform, Injectable, ArgumentMetadata, UnprocessableEntityException } from '@nestjs/common';
import { FILE_UPLOAD } from '../constants/file.constants';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!value) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        message: 'Validation errors',
        errors: [{ field: 'file', constraints: { validation: 'File is required' } }],
      });
    }

    if (value.size > FILE_UPLOAD.MAX_FILE_SIZE) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        message: 'Validation errors',
        errors: [{ field: 'file', constraints: { validation: `File size exceeds ${FILE_UPLOAD.MAX_FILE_SIZE / (1024 * 1024)}MB limit` } }],
      });
    }

    return value;
  }
}
