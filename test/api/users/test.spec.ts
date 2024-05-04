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

  it('should return status code 201', async () => {
    const response = await request(app.server)
      .post('/users')
      .send()

    expect(response.statusCode).toBe(201)
  })
})
