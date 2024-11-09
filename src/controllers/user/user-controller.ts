import { AccountRepository } from '../../contracts/account-repository'
import { Encrypter } from '../../contracts/encrypter'
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

  constructor (
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
    private readonly encrypterAdapter: Encrypter) {}

  async create(input: CreateUserDTO) {
    const { name, email, description, password } = input
    const account = Account.create(name, description)
    const createdAccount = await this.accountRepository.save(account)
    console.log(createdAccount)
    const user = User.create(createdAccount.getId(), name, email, new Password(this.encrypterAdapter.encrypt({ rawValue: password, salt: 8 })))
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
