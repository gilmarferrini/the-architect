import { beforeAll, describe, it, expect, afterAll } from 'vitest'
import { app } from '../../../src/app';
import request from 'supertest'

describe('Users Routes', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.skip('should return status code 201 on create user', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        firstName: 'Gilmar',
        lastName: 'Ferrini',
        password: '123456',
        email: 'ferrinigilmar@gmail.com',
      })

    expect(response.statusCode).toBe(201)
  })

  it ('should return an error if send the password with less than 6 characters', async () => {
    const response = await request(app.server)
    .post('/users')
    .send({
      firstName: 'Gilmar',
      lastName: 'Ferrini',
      password: '12345',
      email: 'ferrinigilmar@gmail.com',
    })

    expect(response.statusCode).toBe(422)
    expect(response.body).toEqual({
      message: {
        _errors: [],
        password: {
          _errors: [
            'String must contain at least 6 character(s)'
          ],
        },
      },
    })
  })
})
