import type { Organization, Prisma, Role } from 'generated/prisma'
import type { IOrganizationsRepository } from '../interfaces/organizations-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationsRepository implements IOrganizationsRepository {
  private organizations: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: randomUUID(),
      responsibleName: data.responsibleName,
      email: data.email,
      passwordHash: data.passwordHash,
      role: 'ORG' as Role,
      cep: data.cep,
      city: data.city,
      address: data.address,
      phone: data.phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.organizations.push(organization)

    return organization
  }

  async findByEmail(email: string) {
    const orgExists = this.organizations.find((org) => org.email === email)

    if (!orgExists) {
      return null
    }

    return orgExists
  }
}
