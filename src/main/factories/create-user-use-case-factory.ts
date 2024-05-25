import { UsersRepositoryImplementation } from "../repositories/users-repository"
import { CreateUserUseCase } from "../use-cases/create-user"

export class CreateUserUseCaseFactory {
  static create() {
    const usersRepository = new UsersRepositoryImplementation()
    const createUserUseCase = new CreateUserUseCase(usersRepository)
    return createUserUseCase
  }
}
