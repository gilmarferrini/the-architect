import { UserRepository } from '../../repositories/user-repository'
import { UseCase } from '../../usecases/use-case'

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
    private readonly createUserUseCase: UseCase<CreateUserDTO, void>) {}

  async create(input: CreateUserDTO) {
    const { email } = input
    await this.createUserUseCase.execute(input)
    const createdUser = await this.userRepository.findByEmail(email)

    return {
      id: createdUser.getId(),
      name: createdUser.getName(),
      email: createdUser.getEmail(),
      password: createdUser.getPassword()
    }
  }
}
