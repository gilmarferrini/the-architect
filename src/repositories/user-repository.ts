import { UserRepository } from '../contracts/user-repository'
import { db } from '../database';
import { Password } from '../models/password';
import { User } from '../models/user';

export class UserRepositoryDatabase implements UserRepository {

  public async save(user: User): Promise<void> {
    await db('users').insert({
      account_id: user.getAccountId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword()
    })
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await db('users')
      .select('*')
      .where({
        email
      })
      .first()

    return new User(user.name, user.email, new Password(user.password), user.account_id, user.id)
  }
}
