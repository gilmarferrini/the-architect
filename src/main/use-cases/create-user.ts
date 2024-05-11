import { db } from "../../core/knex";
import { CreateUserDTO } from "../dtos/create-user";
import { CreateUser } from "../interfaces/create-user";
import { hash } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";

export class CreateUserUseCase implements CreateUser {
  constructor (private readonly usersRepository: UsersRepository) {}

  async perform({ firstName, lastName, email, password, accountId }: CreateUserDTO): Promise<any> {
    const passwordHash = await hash(password, 6)
    await this.usersRepository.save({
      firstName,
      lastName,
      email,
      password: passwordHash,
      accountId,
      archived: false
    })
  }
}
