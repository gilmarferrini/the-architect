import { db } from "../../core/knex";
import { CreateUserDTO } from "../dtos/create-user";
import { CreateUser } from "../interfaces/create-user";

export class CreateUserUseCase implements CreateUser {
  async perform({ firstName, lastName, email, password, accountId }: CreateUserDTO): Promise<any> {
    await db('users').insert({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      account_id: accountId,
      archived: false,
      user_type: 'admin'
    })
  }
}
