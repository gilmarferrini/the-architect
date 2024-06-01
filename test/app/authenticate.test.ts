import { describe, it, beforeEach, expect } from 'vitest'
import { Authenticate } from '../../src/main/interfaces/authenticate'
import { UsersRepository } from '../../src/main/repositories/interfaces/users-repository'
import { AuthenticateUseCase } from '../../src/main/use-cases/authenticate'
import { InMemoryUsersRepository } from '../../src/main/repositories/in-memory-users-repository'
import { InvalidResourceError } from '../../src/main/errors/invalid-resource'

describe('Authenticate', () => {
  let sut: Authenticate
  let inMemoryUsersRepository: UsersRepository

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(inMemoryUsersRepository)
  })

  it('should return error if email non exists', async () => {
    expect(async () => {
      await sut.perform({
        email: 'non-exists-email@email.com',
        password: '123456'
      })
    }).rejects.toBeInstanceOf(InvalidResourceError)
  })
})
