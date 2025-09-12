import type { Prisma } from '../../../../generated/prisma'
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
}
