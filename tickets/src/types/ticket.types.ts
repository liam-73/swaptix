import { Document, Model } from 'mongoose'

export interface TicketAttributes {
  title: string
  price: number
  userId: string
}

export interface TicketDoc extends Document {
  title: string
  price: number
  userId: string
}

export interface TicketModel extends Model<TicketDoc> {
  build(attributes: TicketAttributes): TicketDoc
}
