import express, { Request, Response } from 'express'
import { UserController } from './controllers/user/user-controller'
import { UserRepositoryDatabase } from './repositories/user-repository'
import { AccountRepositoryDatabase } from './repositories/account-repository'

const server = express()
server.use(express.json())

server.post('/users', async (request: Request, response: Response) => {
  const userRepositoryDatabase = new UserRepositoryDatabase()
  const accountRepository = new AccountRepositoryDatabase()
  const userController = new UserController(userRepositoryDatabase, accountRepository)
  const createdUser = await userController.create(request.body);
  console.log('createdUser', createdUser)
  return response.status(201).json(createdUser)
})

export {
  server
}
