import { ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export class ValidationException extends BadRequestException {
  #errors: ValidationError[];
  constructor(errors?: ValidationError[]) {
    super();
    this.#errors = errors;
  }

  getErrors() {
    return this.#errors;
  }
}
