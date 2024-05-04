import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: UsersTable;
    accounts: AccountsTable;
  }
}

export interface AccountsTable {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

interface UsersTable {
  id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  archived: boolean;
  user_type: 'admin' | 'user'
  created_at: string;
  account_id: string;
}
