import { Account } from '../models/account';

export interface AccountRepository {
  save(account: Account): Promise<Account>
}
