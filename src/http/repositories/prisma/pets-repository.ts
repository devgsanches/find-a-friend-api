import type { Pet, Prisma } from '../../../../generated/prisma'
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

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    if (!pet) {
      return null
    }

    return pet
  }

  async findByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        city: {
          contains: city,
          mode: 'insensitive',
        },
      },
    })

    return pets
  }
}
