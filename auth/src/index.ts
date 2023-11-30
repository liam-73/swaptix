import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter,
} from './routes'
import { errorHandler } from './middlewares'
import { NotFoundError } from './errors'

const app = express()
const port = process.env.PORT || 3000

app.use(json())

app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(currentUserRouter)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

app.listen(port, () => console.log('listening on port:::', port))
