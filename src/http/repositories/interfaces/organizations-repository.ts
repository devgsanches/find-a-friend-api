import type { Prisma, Organization } from '../../../../generated/prisma'

export interface IOrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
}
