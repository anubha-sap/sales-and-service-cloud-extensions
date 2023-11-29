import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  ValidationError,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { TypeORMError } from 'typeorm';
import { MESSAGES } from '../constants';
import { ValidationException } from '../validations/validation.exception';
import { ServerException } from './server-exception';
import { CustomLogger } from '../../logger/logger.service';

@Catch(HttpException)
export class AnyExceptionFilter<T> implements ExceptionFilter {
  private customValidationErrors: any[];
  private logger: CustomLogger;

  constructor() {
    this.customValidationErrors = [];
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    let className = AnyExceptionFilter.name;
    let methodName = this.catch.name;
    let stack = exception.stack;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    this.logger = new CustomLogger(request);
    this.logger.setClassName(AnyExceptionFilter.name);

    const errorResponse = {
      error: {
        code: this.getStatus(exception),
        message: exception.message,
      },
    };

    this.customValidationErrors = [];

    if (exception instanceof ValidationException && exception.getErrors()) {
      const exceptions = exception.getErrors();
      const errors = this.getCustomValidationErrors(exceptions);
      errorResponse.error['details'] = errors;
    } else if (exception instanceof ServerException) {
      const oError = exception.getError();
      errorResponse.error.message = exception.getErrorMessage();
      if (oError instanceof TypeORMError) {
        const sErrMsg =
          oError['sqlState'] === '23000'
            ? MESSAGES.UNIQUE_KEY_CONSTRAINT_FAILED
            : MESSAGES.DB_ERROR;
        errorResponse.error.message = sErrMsg;
      } else if (!(oError instanceof HttpException)) {
        errorResponse.error.message = MESSAGES.INTERNAL_SERVER_ERROR;
      }
      className = exception.getClassName();
      methodName = exception.getMethodName();
      stack = exception.getAdditionalInfo();
    }

    this.logger.error(
      `\n${request.method} ${request.url} \nResponse: ${JSON.stringify(
        errorResponse,
      )}\nPayload: ${JSON.stringify(request.body)}`,
    );
    this.logger.error(
      `Class: ${className} \nMethod: ${methodName} \nMessage: ${errorResponse.error.message} \n<--------------Stack trace-------------->\n ${stack}\n <--------------End-------------->`,
    );
    response.status(this.getStatus(exception)).json(errorResponse);
  }

  getStatus(exception) {
    if (exception instanceof ServerException) {
      exception = exception.getError();
    }
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  getCustomValidationErrors(errors: ValidationError[], parentPath = '') {
    const map = new Map();
    errors.forEach((error) => {
      /* istanbul ignore if */
      if (error.children === undefined || error.children.length === 0) {
        parentPath.match(error.property)
          ? map.set(parentPath.substring(0, parentPath.length - 1), error)
          : map.set(parentPath + error.property, error);
      } else {
        parentPath === ''
          ? this.getCustomValidationErrors(error.children, `${error.property}.`)
          : this.getCustomValidationErrors(
              error.children,
              `${parentPath}${error.property}.`,
            );
      }
    });

    map.forEach(async (error: ValidationError, propertyName: string) => {
      const customValidationError = {
        message: Object.values(error.constraints).join('.'),
        target: propertyName,
        value: error.value,
      };
      this.customValidationErrors.push(customValidationError);
    });
    map.clear();
    return this.customValidationErrors;
  }
}
