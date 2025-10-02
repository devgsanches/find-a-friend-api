import { expect, describe, it, beforeEach } from 'vitest'
import { OrgAuthenticateUseCase } from '../org-authenticate'
import { InMemoryOrganizationsRepository } from '../../repositories/in-memory/organizations-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

describe('Organization Authenticate Use Case', () => {
  let organizationsRepository: InMemoryOrganizationsRepository
  let sut: OrgAuthenticateUseCase

  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new OrgAuthenticateUseCase(organizationsRepository)
  })

  it('should be able authenticate a organization', async () => {
    await organizationsRepository.create({
      responsibleName: 'ORG1',
      email: 'org1@example.com',
      passwordHash: await hash('123456', 6),
      cep: '1234567890',
      city: 'São Paulo',
      address: 'Rua das Flores',
      phone: '1234567890',
    })

    const { org } = await sut.execute({
      email: 'org1@example.com',
      password: '123456',
    })

    expect(org).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        responsibleName: 'ORG1',
        email: 'org1@example.com',
        role: 'ORG',
        cep: '1234567890',
        city: 'São Paulo',
        address: 'Rua das Flores',
        phone: '1234567890',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    )
  })

  it('should not be possible to authenticate an email from a organization that does not exist', async () => {
    const email = 'org1@example.com'

    await expect(() =>
      sut.execute({
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be possible to authenticate with an incorrect password', async () => {
    await organizationsRepository.create({
        responsibleName: 'ORG1',
        email: 'org1@example.com',
        passwordHash: await hash('123456', 6),
        cep: '1234567890',
        city: 'São Paulo',
        address: 'Rua das Flores',
        phone: '1234567890',
    })

    await expect(() =>
      sut.execute({
        email: 'john.doe@example.com',
        password: '1234567',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
