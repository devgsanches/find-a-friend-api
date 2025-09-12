
import type { Organization } from '../../../generated/prisma'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { IOrganizationsRepository } from '../repositories/interfaces/organizations-repository'

interface IGetOrgByEmailRequest {
  email: string
}

interface IGetOrgByEmailResponse {
  org: Organization
}

export class GetOrgByEmailUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) {}

  async execute({ email }: IGetOrgByEmailRequest): Promise<IGetOrgByEmailResponse> {
    const org = await this.organizationsRepository.findByEmail(email)

    if (!org) {
      throw new ResourceNotFoundError('Organization not found.')
    }

    return { org }
  }
}
