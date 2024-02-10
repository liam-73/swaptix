import { Request, Response, Router } from 'express'
import { body } from 'express-validator'
import { authenticator, validateRequest } from '@swaptix/common'

const router = Router()

router.post(
  '/api/tickets',
  authenticator,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than zero'),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.sendStatus(201)
  }
)

export { router as createTicketRouter }
