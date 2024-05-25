import { db } from "../../core/knex";
import { UsersRepositoryInput, UsersRepository } from "./interfaces/users-repository";

export class UsersRepositoryImplementation implements UsersRepository {
  async save ({ firstName, lastName, email, password, accountId, archived }: UsersRepositoryInput) {
    await db('users').insert({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      account_id: accountId,
      archived,
      user_type: 'admin'
    })
  }
}
