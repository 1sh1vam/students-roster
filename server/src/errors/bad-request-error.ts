import { FieldValidationError, ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string, public errors?: ValidationError[]) {
    super(message);
  }

  serializeErrors() {
    return this.errors
      ? (this.errors as FieldValidationError[]).map((err) => ({
          message: err.msg,
          field: err.path,
        }))
      : [{ message: this.message }];
  }
}