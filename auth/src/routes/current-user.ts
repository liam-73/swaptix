import { Router } from 'express'

const router = Router()

router.get('/api/users/currentuser', (req, res) => {
  res.send('hello')
})

export { router as currentUserRouter }
