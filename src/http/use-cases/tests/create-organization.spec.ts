import { expect, describe, it, beforeEach } from 'vitest'
import { CreateOrganizationUseCase } from '../create-organization'
import { InMemoryOrganizationsRepository } from '../../repositories/in-memory/organizations-repository'
import { compare, hash } from 'bcryptjs'

describe('Create Organization Use Case', () => {
  let organizationsRepository: InMemoryOrganizationsRepository
  let sut: CreateOrganizationUseCase

  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should be create a organization', async () => {
    const { organization } = await sut.execute({
      responsibleName: 'ORG1',
      email: 'org1@example.com',
      password: '123456',
      cep: '08255010',
      address: 'Rua 1',
      phone: '1234567890',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should correctly hash the password of an organization', async () => {
    const { organization } = await sut.execute({
      responsibleName: 'ORG1',
      email: 'org1@example.com',
      password: '123456',
      cep: '08255010',
      address: 'Rua 1',
      phone: '1234567890',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.passwordHash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
