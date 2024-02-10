import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../app'
import jwt from 'jsonwebtoken'

declare global {
  var signin: () => string[]
}

let mongo: any

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf'

  mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()

  await mongoose.connect(mongoUri)
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  if (mongo) await mongo.stop()

  await mongoose.connection.close()
})

global.signin = () => {
  const payload = { id: '123456', email: 'test@test.com' }

  const session = JSON.stringify({
    token: jwt.sign(payload, process.env.JWT_KEY!),
  })

  const base64 = Buffer.from(session).toString('base64')

  return [`session=${base64}`]
}
