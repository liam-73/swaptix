import { CustomError } from '.'

export class DataBaseConnectionError extends CustomError {
  reason = 'Failed to connect database'
  statusCode = 500

  constructor() {
    super('Failed to connect database')

    Object.setPrototypeOf(this, DataBaseConnectionError.prototype)
  }

  serializeErrors() {
    return [{ message: this.reason }]
  }
}
