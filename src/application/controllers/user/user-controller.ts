import { Encrypter } from '../../../adapters/encrypter-adapter'
import { Account } from '../../../domain/entities/account'
import { User } from '../../../domain/entities/user'
import { AccountRepository } from '../../repositories/account-repository'
import { UserRepository } from '../../repositories/user-repository'

interface CreateUserDTO {
  name: string
  email: string
  description: string
  password: string
  confirmPassword: string
}

export class UserController {

  constructor (
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
    private readonly encrypterAdapter: Encrypter) {}

  async create(input: CreateUserDTO) {
    const { name, email, description, password } = input
    const account = Account.create(name, description)
    const createdAccount = await this.accountRepository.save(account)
    console.log(createdAccount)
    const hashedPassword = this.encrypterAdapter.encrypt({ rawValue: password, salt: 8 })
    const user = User.create(createdAccount.getId(), name, email, hashedPassword)
    console.log(user)
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
