import { UserRepository } from '../../repositories/user-repository'
import { UseCase } from '../../usecases/use-case'
import validator from 'validator'

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
    private readonly createUserUseCase: UseCase<CreateUserDTO, void>
  ) {}

  async create(input: CreateUserDTO) {
    const { email } = input
    const emailIsValid = validator.isEmail(email)
    if (!emailIsValid) {
      throw new Error('Email is invalid')
    }
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
