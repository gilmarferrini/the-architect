import { expect, it } from 'vitest';
import request from 'supertest'
import { server } from '../../src/server';

it('should return 404 if user not exists', async () => {
    const input = {
      email: 'invalid-email@gail.com',
      password: '1234567890',
    }

  const output = await request(server)
    .post('/users/authenticate')
    .send(input)
    .set('Accept', 'application/json')
  expect(output.status).toEqual(401)
  expect(output.body).toEqual({
    message: 'unauthorized',
  })
})

it('should authenticate a user', async () => {
  const email = `${Math.random()}@gmail.com`
  await request(server)
    .post('/users')
    .send({
      name: 'gilmar ferrini tech',
      description: 'some description',
      email,
      password: '1234567890',
      confirmPassword: '1234567890'
    })
    .set('Accept', 'application/json')
    const input = {
      email,
      password: '1234567890',
    }

  const output = await request(server)
    .post('/users/authenticate')
    .send(input)
    .set('Accept', 'application/json')
  expect(output.status).toEqual(200)
  expect(output.body).toEqual({
    token: expect.any(String)
  })
})
