import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomLogger } from '../../logger/logger.service';
import { SESSION } from '../constants';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const requestId = request[SESSION]?.reqId;
    const customLogger = new CustomLogger(request);
    customLogger.setClassName(LoggingInterceptor.name);
    const url = request.url;
    const method = request.method;
    customLogger.debug(
      `Request received for request ${requestId} for ${method} on ${url}`,
    );
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          customLogger.debug(
            `Request for request ${requestId} for ${method} on ${url} was served in ${
              (Date.now() - now) / 1000
            } seconds`,
          ),
        ),
      );
  }
}
