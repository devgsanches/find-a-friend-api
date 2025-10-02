
import type { Organization } from '../../../generated/prisma'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { IOrganizationsRepository } from '../repositories/interfaces/organizations-repository'

interface IGetOrgByIdRequest {
  id: string
}

interface IGetOrgByIdResponse {
  org: Organization
}

export class GetOrgByIdUseCase {
  constructor(private organizationRepository: IOrganizationsRepository) {}

  async execute({ id }: IGetOrgByIdRequest): Promise<IGetOrgByIdResponse> {
    const org = await this.organizationRepository.findById(id)

    if (!org) {
      throw new ResourceNotFoundError('Org not found.')
    }

    return { org }
  }
}
