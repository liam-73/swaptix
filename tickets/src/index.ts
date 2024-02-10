import { app } from './app'
import { connect } from './loaders'

const port = process.env.PORT || 3000

;(async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY is missing')
  if (!process.env.DB_URL) throw new Error('DB_URL is missing')

  try {
    await connect(process.env.DB_URL)

    app.listen(port, () => {
      console.log('Listening on port', port)
    })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
})()
