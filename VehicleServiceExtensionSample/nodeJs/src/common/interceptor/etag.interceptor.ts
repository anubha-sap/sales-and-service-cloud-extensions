import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { ETAG, ETAG_HTTP_METHODS } from '../constants';
export interface Response<T> {
  data: T;
}

@Injectable()
export class EtagInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request: Request = context.switchToHttp().getRequest();
    const method = request.method.toLocaleUpperCase();
    return next.handle().pipe(
      map((response) => {
        if (ETAG_HTTP_METHODS.includes(method)) {
          this.setEtagValue(request, response);
          return response;
        }
      }),
    );
  }
  setEtagValue(request, response) {
    if (response && response.adminData && response.adminData.updatedOn) {
      request.res.header(
        ETAG,
        response.adminData.updatedOn.toString().toUpperCase(),
      );
    }
  }
}
