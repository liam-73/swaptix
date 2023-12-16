import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'

import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter,
} from './routes'
import { errorHandler } from './middlewares'
import { NotFoundError } from './errors'
import { connect } from './loaders'

const app = express()
const port = process.env.PORT || 3000

app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({ signed: false, secure: true }))

app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(currentUserRouter)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)
;(async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY is missing')

  try {
    await connect('mongodb://auth-db-srv:27017/auth')

    app.listen(port, () => {
      console.log('Listening on port', port)
    })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
})()
