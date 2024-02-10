import request from 'supertest'
import { app } from '../../app'

describe('POST create ticket', () => {
  it('has a post route handler for /api/tickets', async () => {
    const response = await request(app).post('/api/tickets').send({})

    expect(response.status).not.toEqual(404)
  })

  it('can only be accessed if user is signed in', async () => {
    await request(app).post('/api/tickets').send({}).expect(401)
  })

  it('returns status other than 401 if user is signed in', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({})

    expect(response.status).not.toEqual(401)
  })

  it('returns a error if title is invalid', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({
        title: '',
        price: 10,
      })
      .expect(400)

    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ price: 10 })
      .expect(400)
  })

  it('returns a error if price is invalid', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title: 'asdfjkl;', price: -10 })
      .expect(400)

    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title: 'testing' })
      .expect(400)
  })

  it('able to create a ticket', async () => {})
})
