import { db } from "../../core/knex";
import { CreateUserDTO } from "../dtos/create-user";
import { CreateUser } from "../interfaces/create-user";
import { hash } from "bcryptjs";

export class CreateUserUseCase implements CreateUser {
  async perform({ firstName, lastName, email, password, accountId }: CreateUserDTO): Promise<any> {
    const passwordHash = await hash(password, 6)

    await db('users').insert({
      first_name: firstName,
      last_name: lastName,
      email,
      password: passwordHash,
      account_id: accountId,
      archived: false,
      user_type: 'admin'
    })
  }
}
