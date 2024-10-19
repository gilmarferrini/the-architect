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
  async create(input: CreateUserDTO) {
    const { name, email, description, password } = input
    const [createdAccount] = await db('accounts').insert({
      name,
      description
    }).returning('*')
    const account = new Account(name, description, createdAccount.id)
    const accountId = account.getId() as number
    const user = new User(name, email, new Password(password), accountId)
    const [createdUser] = await db('users').insert({
      name: user.getName(),
      email: user.getEmail(),
      account_id: accountId,
      password: user.getPassword()
    }).returning('*')

    return createdUser
  }
}
