import express, { Request, Response } from 'express'
import { UserController } from './controllers/user/user-controller'

const server = express()
server.use(express.json())

server.post('/users', async (request: Request, response: Response) => {
  const userController = new UserController()
  const createdUser = await userController.create(request.body);
  console.log('createdUser', createdUser)
  return response.status(201).json(createdUser)
})

export {
  server
}
