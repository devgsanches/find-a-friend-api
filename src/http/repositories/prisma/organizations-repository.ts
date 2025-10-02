import type { Organization, Prisma } from '../../../../generated/prisma'
import { prisma } from '../../../database/prisma'
import type { IOrganizationsRepository } from '../interfaces/organizations-repository'
// import type { Prisma } from 'generated/prisma'

export class PrismaOrganizationsRepository implements IOrganizationsRepository {
  
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async findByEmail(email: string) {
    const org = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string): Promise<Organization | null> {
    const org = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    if (!org) {
      return null
    }

    return org
  }
}
