import type { Organization } from '../../../generated/prisma'
import type { IOrganizationsRepository } from '../repositories/interfaces/organizations-repository'

interface ICreateOrganizationRequest {
  responsibleName: string
  email: string
  passwordHash: string
  cep: string
  city: string
  address: string
  phone: string
}

interface ICreateOrganizationResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) {}

  async execute({
    responsibleName,
    email,
    passwordHash,
    cep,
    city,
    address,
    phone,
  }: ICreateOrganizationRequest): Promise<ICreateOrganizationResponse> {
    const organization = await this.organizationsRepository.create({
      responsibleName,
      email,
      passwordHash,
      cep,
      city,
      address,
      phone,
    })

    return { organization }
  }
}
