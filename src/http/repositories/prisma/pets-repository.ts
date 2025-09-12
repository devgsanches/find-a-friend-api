import type { Prisma } from '../../../../generated/prisma'
import { prisma } from '../../../database/prisma'
// import type { Prisma } from 'generated/prisma'
import type { IPetsRepository } from '../interfaces/pets-repository'

export class PrismaPetsRepository implements IPetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
