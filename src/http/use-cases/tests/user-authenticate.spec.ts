import { expect, describe, it, beforeEach } from 'vitest'
import { UserAuthenticateUseCase } from '../user-authenticate'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../repositories/in-memory/users-repository'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

describe('User Authenticate Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: UserAuthenticateUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UserAuthenticateUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      passwordHash: await hash('123456', 6),
    })
    const { user } = await sut.execute({
      email: 'john.doe@example.com',
      password: '123456',
    })

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'USER',
        createdAt: expect.any(Date),
      })
    )
  })

  it('should not be possible to authenticate an email from a user that does not exist', async () => {
    const email = 'john.doe@example.com'

    await expect(() =>
      sut.execute({
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be possible to authenticate with an incorrect password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      passwordHash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'john.doe@example.com',
        password: '1234567',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
