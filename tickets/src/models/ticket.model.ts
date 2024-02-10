import { Schema, model } from 'mongoose'
import { TicketAttributes, TicketDoc, TicketModel } from '../types'

const ticketSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

ticketSchema.statics.build = (attrs: TicketAttributes) => new Ticket(attrs)

export const Ticket = model<TicketDoc, TicketModel>('Ticket', ticketSchema)
