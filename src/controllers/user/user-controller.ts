import { AccountRepository } from '../../contracts/account-repository'
import { UserRepository } from '../../contracts/user-repository'
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

  constructor (private readonly userRepository: UserRepository, private readonly accountRepository: AccountRepository) {}

  async create(input: CreateUserDTO) {
    const { name, email, description, password } = input
    const account = new Account(name, description)
    const createdAccount = await this.accountRepository.save(account)
    const accountId = createdAccount.getId() as number
    const user = new User(name, email, new Password(password), accountId)
    await this.userRepository.save(user)
    const createdUser = await this.userRepository.findByEmail(email)

    return {
      id: createdUser.getId(),
      name: createdUser.getName(),
      email: createdUser.getEmail(),
      password: createdUser.getPassword()
    }
  }
}
