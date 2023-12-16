import { NextFunction, Request, Response } from 'express'
import { NotAuthorizedError } from '../errors'

export const authenticator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) throw new NotAuthorizedError()

  next()
}
