import { db } from "../../core/knex";
import { CreateUserDTO } from "../dtos/create-user";
import { CreateUser } from "../interfaces/create-user";
import { hash } from "bcryptjs";
import { UsersRepository } from "../repositories/interfaces/users-repository";
import { EmailAlreadyExistsError } from "../errors/email-already-exists";

export class CreateUserUseCase implements CreateUser {
  constructor (private readonly usersRepository: UsersRepository) {}

  async perform({ firstName, lastName, email, password, accountId }: CreateUserDTO): Promise<any> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsError()
    }

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
