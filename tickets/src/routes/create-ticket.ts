import { authenticator } from '@swaptix/common'
import { Request, Response, Router } from 'express'

const router = Router()

router.post('/api/tickets', authenticator, (req: Request, res: Response) => {
  res.sendStatus(201)
})

export { router as createTicketRouter }
