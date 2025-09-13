import type { IPetsRepository } from '../repositories/interfaces/pets-repository'

import type { User } from '../../../generated/prisma'
import type { IUsersRepository } from '../repositories/interfaces/users-repository'
import { hash } from 'bcryptjs'

interface ICreateUserRequest {
  name: string
  email: string
  password: string
}

interface ICreateUserResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUserRequest): Promise<ICreateUserResponse> {
    const password_hash = await hash(password, 6)
    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash: password_hash,
    })

    return { user }
  }
}
