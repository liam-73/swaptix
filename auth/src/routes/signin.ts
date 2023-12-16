import { Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'
import { validateRequest } from '../middlewares'
import { User } from '../models'
import { BadRequestError } from '../errors'
import { Password } from '../services'

const router = Router()

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must apply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) throw new BadRequestError('Invalid credentials')

    const passwordsMatched = await Password.compare(user.password, password)

    if (!passwordsMatched) throw new BadRequestError('Invalid credentials')

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    )

    req.session = { token }

    res.status(200).send(user)
  }
)

export { router as signInRouter }
