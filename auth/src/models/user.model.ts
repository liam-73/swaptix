import { Schema, model } from 'mongoose'
import { UserAttributes, UserDoc, UserModel } from '../types'
import { Password } from '../services'

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id

        delete ret._id
        delete ret.password
        delete ret.__v
      },
    },
  }
)

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.hash(this.get('password'))

    this.set('password', hashed)
  }

  done()
})

userSchema.statics.build = (attrs: UserAttributes) => new User(attrs)

export const User = model<UserDoc, UserModel>('User', userSchema)
