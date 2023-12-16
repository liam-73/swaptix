import mongoose from 'mongoose'

export async function connect(url: string) {
  try {
    await mongoose.connect(url, { autoIndex: true })

    const dbUrl = new URL(url)
    console.log(`Connected to database @ ${dbUrl.host}`)
  } catch (err: any) {
    console.error('Mongoose connection error', err)
  }
}
