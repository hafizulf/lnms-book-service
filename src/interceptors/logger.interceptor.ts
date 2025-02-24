import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class GrpcLoggerInterceptor implements NestInterceptor {
  private logger = new Logger('gRPC');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler().name;
    this.logger.log(`Handling ${handler}`);
    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(`Handled ${handler} in ${Date.now() - now}ms`),
        ),
      );
  }
}
