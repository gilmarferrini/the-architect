import { Encrypter } from '../../adapters/encrypter-adapter'
import { Account } from '../../domain/entities/account'
import { User } from '../../domain/entities/user'
import { AccountRepository } from '../repositories/account-repository'
import { UserRepository } from '../repositories/user-repository'
import { UseCase } from './use-case'

export class CreateUserUseCase implements UseCase<Input, void> {

  constructor (
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
    private readonly encrypterAdapter: Encrypter
  ) { }

  async execute(input: Input): Promise<void> {
    const { name, email, description, password } = input
    const account = Account.create(name, description)
    const createdAccount = await this.accountRepository.save(account)
    console.log(createdAccount)
    const hashedPassword = this.encrypterAdapter.encrypt({ rawValue: password, salt: 8 })
    const user = User.create(createdAccount.getId(), name, email, hashedPassword)
    console.log(user)
    await this.userRepository.save(user)
  }

}

interface Input {
  name: string
  email: string
  description: string
  password: string
  confirmPassword: string
}
