import type { Organization } from '../../../generated/prisma'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { IOrganizationsRepository } from '../repositories/interfaces/organizations-repository'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface IOrgAuthenticateRequest {
  email: string
  password: string
}

interface IOrgAuthenticateResponse {
  org: Organization
}

export class OrgAuthenticateUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) {}

  async execute({
    email,
    password,
  }: IOrgAuthenticateRequest): Promise<IOrgAuthenticateResponse> {
    const org = await this.organizationsRepository.findByEmail(email)

    if (!org) {
      throw new ResourceNotFoundError('Organization not found.')
    }

    const passwordMatch = await compare(password, org.passwordHash)

    if (!passwordMatch) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
