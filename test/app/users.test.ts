import { describe, it, beforeEach, expect } from 'vitest'
import { CreateUserUseCase } from '../../src/main/use-cases/create-user'
import { UsersRepository } from '../../src/main/repositories/interfaces/users-repository'
import { InMemoryUsersRepository } from '../../src/main/repositories/in-memory-users-repository'
import { EmailAlreadyExistsError } from '../../src/main/errors/email-already-exists'


describe('Create User Use Case', () => {
  let sut: CreateUserUseCase
  let inMemoryUsersRepository: UsersRepository

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('should return error if email already exists', async () => {
    await inMemoryUsersRepository.save({
      firstName: 'User',
      lastName: 'Default',
      email: 'userdefault@email.com',
      accountId: '1',
      archived: false,
      password: '123456'
    })

    expect(async () => {
      await sut.perform({
        firstName: 'User',
        lastName: 'Default',
        email: 'userdefault@email.com',
        accountId: '1',
        password: '123456'
      })
    }).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
