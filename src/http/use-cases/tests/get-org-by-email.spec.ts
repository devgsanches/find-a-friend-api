import { expect, describe, it, beforeEach } from 'vitest'
import { GetOrgByEmailUseCase } from '../get-org-by-email'
import { InMemoryOrganizationsRepository } from '../../repositories/in-memory/organizations-repository'
import { compare, hash } from 'bcryptjs'
import type { Role } from 'generated/prisma'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

describe('Get Org By Email Use Case', () => {
  let organizationsRepository: InMemoryOrganizationsRepository
  let sut: GetOrgByEmailUseCase

  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new GetOrgByEmailUseCase(organizationsRepository)
  })

  it('should be get a organization by email', async () => {
    const organization = await organizationsRepository.create({
      responsibleName: 'ORG1',
      email: 'org1@example.com',
      passwordHash: '123456',
      cep: '08255010',
      address: 'Rua 1',
      phone: '1234567890',
      city: 'São Paulo',
      role: 'ORG' as Role,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const { org } = await sut.execute({
      email: organization.email,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be get a organization by email, because organization not exists', async () => {
    await expect(
      sut.execute({
        email: 'org1@example.com',
      })
    ).rejects.toThrow(ResourceNotFoundError)
  })
})
