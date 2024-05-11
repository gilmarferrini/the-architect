export interface UsersRepository {
  save(input: UsersRepositoryInput): Promise<void>
}

export interface UsersRepositoryInput {
  firstName: string
  lastName: string
  password: string
  email: string
  archived: boolean
  accountId: string
}
