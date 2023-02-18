import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controllerName = context.getClass().name;
    const methodName = context.getHandler().name;

    this.logger.log(
      `Controller: ${controllerName}, Method: ${methodName} called with request ${JSON.stringify(
        context.switchToHttp().getRequest().body,
      )}`,
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `Controller: ${controllerName}, Method: ${methodName} finished with response ${JSON.stringify(
            context.switchToHttp().getResponse().statusCode,
          )}`,
        );
      }),
      catchError((error) => {
        this.logger.error(
          `Controller: ${controllerName}, Method: ${methodName} error occurred: ${JSON.stringify(
            error.message,
          )}`,
        );
        return throwError(() => error);
      }),
    );
  }
}
