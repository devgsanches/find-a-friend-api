import { PrismaOrganizationsRepository } from '../../repositories/prisma/organizations-repository'
import { GetOrgByIdUseCase } from '../get-org-by-id'

export function makeGetOrgByIdUseCase() {
  const organizationRepository = new PrismaOrganizationsRepository()
  const getOrgByIdUseCase = new GetOrgByIdUseCase(organizationRepository)

  return getOrgByIdUseCase
}
