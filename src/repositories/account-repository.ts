import { AccountRepository } from '../contracts/account-repository'
import { db } from '../database'
import { Account } from '../models/account'

export class AccountRepositoryDatabase implements AccountRepository {

  public async save(account: Account): Promise<Account> {
    const [createdAccount] = await db('accounts')
      .insert({
        name: account.getName(),
        description: account.getDescription()
      }).returning('*')

    return new Account(createdAccount.name, createdAccount.description, createdAccount.id)
  }

}
