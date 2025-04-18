import { expect, it } from 'vitest';
import request from 'supertest'
import { server } from '../../src/server';

it('should return error if email is invalid', async () => {
  const response = await request(server)
    .post('/users')
    .send({
      name: 'gilmar ferrini tech',
      description: 'some description',
      email: `${Math.random()}@gmail.com.br.usa.`,
      password: '1234567890',
      confirmPassword: '1234567890'
    })
    .set('Accept', 'application/json')

  expect(response.body).not.toBeNull()
  expect(response.body.error).toBe('Email is invalid')
})


it('should create a user', async () => {
  const response = await request(server)
    .post('/users')
    .send({
      name: 'gilmar ferrini tech',
      description: 'some description',
      email: `${Math.random()}@gmail.com`,
      password: '1234567890',
      confirmPassword: '1234567890'
    })
    .set('Accept', 'application/json')

  expect(response.body).not.toBeNull()
  expect(response.body.id).toBeDefined()
  expect(response.body.name).toBe('gilmar ferrini tech')
})
