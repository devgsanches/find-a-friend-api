import { PrismaOrganizationsRepository } from '../../repositories/prisma/organizations-repository'

import { OrgAuthenticateUseCase } from '../org-authenticate'

export function makeOrgAuthenticateUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()

  const orgAuthenticateUseCase = new OrgAuthenticateUseCase(
    organizationsRepository
  )

  return orgAuthenticateUseCase
}
