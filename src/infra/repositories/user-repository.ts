import { UserRepository } from '../../application/repositories/user-repository';
import { db } from '../../database';
import { User } from '../../domain/entities/user';


export class UserRepositoryDatabase implements UserRepository {

  public async save(user: User): Promise<void> {
    await db('users').insert({
      id: user.getId(),
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

    if (!user) {
      throw new Error('Email not found')
    }
    return new User(user.id, user.account_id, user.name, user.email, user.password)
  }
}
