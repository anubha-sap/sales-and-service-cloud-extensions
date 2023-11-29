import { InternalServerErrorException } from '@nestjs/common/exceptions';

export class ServerException extends InternalServerErrorException {
  #error: any;
  #errorMessage: string;
  #className: string;
  #methodName: string;
  #additionalInfo: string;
  constructor(error: any, className: string, methodName: string) {
    super();
    if (error instanceof ServerException) {
      // Preserve the original error if an instance of AnyException is passed
      this.#error = error.getError();
      this.#errorMessage = error.getErrorMessage();
      this.#className = error.getClassName();
      this.#methodName = error.getMethodName();
      this.#additionalInfo = error.getAdditionalInfo();
    } else {
      this.#error = error;
      this.#errorMessage = error.message;
      this.#className = className;
      this.#methodName = methodName;
      this.#additionalInfo = error.stack;
    }
  }

  getError() {
    return this.#error;
  }

  getErrorMessage() {
    return this.#errorMessage;
  }

  getClassName() {
    return this.#className;
  }

  getMethodName() {
    return this.#methodName;
  }

  getAdditionalInfo() {
    return this.#additionalInfo;
  }
}
