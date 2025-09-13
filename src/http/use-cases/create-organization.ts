import { hash } from 'bcryptjs'
import type { Organization } from '../../../generated/prisma'
import type { IOrganizationsRepository } from '../repositories/interfaces/organizations-repository'
import axios from 'axios'

interface ICreateOrganizationRequest {
  responsibleName: string
  email: string
  passwordHash: string
  cep: string
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
    address,
    phone,
  }: ICreateOrganizationRequest): Promise<ICreateOrganizationResponse> {
    const password_hash = await hash(passwordHash, 6)

    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    const city = response.data.localidade

    const organization = await this.organizationsRepository.create({
      responsibleName,
      email,
      passwordHash: password_hash,
      cep,
      city,
      address,
      phone,
    })

    return { organization }
  }
}
