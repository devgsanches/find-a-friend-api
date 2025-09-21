import { ResourceAlreadyExistsError } from '@/http/use-cases/errors/resource-already-exists-error'
import type { Prisma } from '../../../../generated/prisma'
import { prisma } from '../../../database/prisma'
import type { IUsersRepository } from '../interfaces/users-repository'
// import type { Prisma } from 'generated/prisma'

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const userAlreadyExists = await this.findByEmail(data.email)
    if (userAlreadyExists) {
      throw new ResourceAlreadyExistsError('User')
    }

    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return user
  }
}
