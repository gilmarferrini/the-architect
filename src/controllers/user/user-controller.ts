import { db } from '../../database'

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

    const [createdUser] = await db('users').insert({
      name,
      email,
      account_id: createdAccount.id,
      password
    }).returning('*')

    return createdUser
  }
}
