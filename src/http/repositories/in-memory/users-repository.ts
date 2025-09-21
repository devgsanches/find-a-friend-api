import { ResourceAlreadyExistsError } from '../../use-cases/errors/resource-already-exists-error'
import type { Prisma, User } from '../../../../generated/prisma'
import type { IUsersRepository } from '../interfaces/users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const userAlreadyExists = await this.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new ResourceAlreadyExistsError('User')
    }

    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role ?? 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(user)
    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
