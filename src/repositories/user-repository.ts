import { UserRepository } from '../contracts/user-repository'
import { db } from '../database';
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
    return db('users')
      .select('*')
      .where({
        email
      })
      .first()
  }
}
