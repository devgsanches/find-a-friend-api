import type { User } from '../../../generated/prisma'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import type { IUsersRepository } from '../repositories/interfaces/users-repository'

interface IUserAuthenticateRequest {
  email: string
  password: string
}

interface IUserAuthenticateResponse {
  user: User
}

export class UserAuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: IUserAuthenticateRequest): Promise<IUserAuthenticateResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const passwordMatch = await compare(password, user.passwordHash)

    if (!passwordMatch) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
