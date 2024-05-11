import { User } from "../entities/user";
import { UsersRepositoryInput } from "./interfaces/users-repository";
import { UsersRepository } from "./users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []
  async save ({ firstName, lastName, email, password, accountId, archived }: UsersRepositoryInput) {
    this.users.push({
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
