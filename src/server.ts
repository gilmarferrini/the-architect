import express, { Request, Response } from 'express'
import { UserController } from './controllers/user/user-controller'
import { UserRepositoryDatabase } from './repositories/user-repository'
import { AccountRepositoryDatabase } from './repositories/account-repository'
import { EncrypterAdapter } from './adapters/encrypter-adapter'
import { AuthenticationController } from './controllers/authentication/authentication'
import { TokenAdapter } from './adapters/token-adapter'

const server = express()
server.use(express.json())
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

server.post('/users', async (request: Request, response: Response) => {
  const userRepositoryDatabase = new UserRepositoryDatabase()
  const accountRepository = new AccountRepositoryDatabase()
  const encrypterAdapter = new EncrypterAdapter()
  const userController = new UserController(userRepositoryDatabase, accountRepository, encrypterAdapter)
  const createdUser = await userController.create(request.body);
  return response.status(201).json(createdUser)
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
