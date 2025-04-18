import express, { Request, Response } from 'express'
import { EncrypterAdapter } from './adapters/encrypter-adapter'
import { TokenAdapter } from './adapters/token-adapter'
import { UserRepositoryDatabase } from './infra/repositories/user-repository'
import { AccountRepositoryDatabase } from './infra/repositories/account-repository'
import { UserController } from './application/controllers/user/user-controller'
import { AuthenticationController } from './application/controllers/authentication/authentication'
import { CreateUserUseCase } from './application/usecases/create-user'

const server = express()
server.use(express.json())
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

server.post('/users', async (request: Request, response: Response) => {
  try {
    const userRepositoryDatabase = new UserRepositoryDatabase()
    const accountRepository = new AccountRepositoryDatabase()
    const encrypterAdapter = new EncrypterAdapter()
    const createUserUseCase = new CreateUserUseCase(userRepositoryDatabase, accountRepository, encrypterAdapter)
    const userController = new UserController(userRepositoryDatabase, createUserUseCase)
    const createdUser = await userController.create(request.body);
    return response.status(201).json(createdUser)
  } catch (err: unknown) {
    if (err instanceof Error) {
      return response.status(422).json({ error: err.message })
    }
    return response.status(422).json({ error: 'Unexpected error' })
  }
})

server.post('/users/authenticate', async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body
    const userRepository = new UserRepositoryDatabase()
    const encrypterAdapter = new EncrypterAdapter()
    const tokenAdapter = new TokenAdapter()
    const authenticationController = new AuthenticationController(userRepository, encrypterAdapter, tokenAdapter)
    const token = await authenticationController.authenticate({
      email,
      password
    })
    return response.status(200).json({ token })
  } catch (err){
    console.log(err)
    return response.status(401).json({ message: 'unauthorized'})
  }
})

export {
  server
}
