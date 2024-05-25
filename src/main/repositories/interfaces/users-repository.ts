import { User } from "../../entities/user"

export interface UsersRepository {
  save(input: UsersRepositoryInput): Promise<void>
  findByEmail(email: string): Promise<User | null>
}

export interface UsersRepositoryInput {
  firstName: string
  lastName: string
  password: string
  email: string
  archived: boolean
  accountId: string
}
