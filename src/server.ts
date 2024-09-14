import express, { Request, Response } from 'express'
import { db } from './database'

const server = express()
server.use(express.json())

server.post('/users', async (request: Request, response: Response) => {
  console.log('request ', request.body)
  const { name, description } = request.body
  const createdAccount = await db('accounts').insert({
    name,
    description
  }).returning('*')

  return response.status(201).json(...createdAccount)
})

export {
  server
}
