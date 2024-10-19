import { UserRepository } from '../../contracts/user-repository'
import { db } from '../../database'
import { Account } from '../../models/account'
import { Password } from '../../models/password'
import { User } from '../../models/user'

interface CreateUserDTO {
  name: string
  email: string
  description: string
  password: string
  confirmPassword: string
}

export class UserController {

  constructor (private readonly userRepository: UserRepository) {}

  async create(input: CreateUserDTO) {
    const { name, email, description, password } = input
    const [createdAccount] = await db('accounts').insert({
      name,
      description
    }).returning('*')
    const account = new Account(name, description, createdAccount.id)
    const accountId = account.getId() as number
    const user = new User(name, email, new Password(password), accountId)
    await this.userRepository.save(user)
    const createdUser = await this.userRepository.findByEmail(email)
    return createdUser
  }
}
