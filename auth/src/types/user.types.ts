import { Document, Model } from 'mongoose'

export interface UserAttributes {
  email: string
  password: string
}

export interface UserModel extends Model<UserDoc> {
  build(attributes: UserAttributes): UserDoc
}

export interface UserDoc extends Document {
  email: string
  password: string
}
