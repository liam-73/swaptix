import { ValidationError } from 'express-validator'
import { CustomError } from '.'

export class RequestValidationError extends CustomError {
  statusCode = 400
  constructor(private errors: ValidationError[]) {
    super('Invalid request parameters')

    // cause we're extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
    return this.errors.map((err) => ({
      message: err.msg,
      field: err.type === 'field' ? err.path : undefined,
    }))
  }
}
