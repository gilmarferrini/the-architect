import { UsersRepository } from "../repositories/users-repository"
import { CreateUserUseCase } from "../use-cases/create-user"

export class CreateUserUseCaseFactory {
  static create() {
    const usersRepository = new UsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository)
    return createUserUseCase
  }
}
