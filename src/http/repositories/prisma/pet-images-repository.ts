import type { Prisma } from '../../../../generated/prisma'
import { prisma } from '../../../database/prisma'
// import type { Prisma } from 'generated/prisma'
import type { IPetImagesRepository } from '../interfaces/pet-images'

export class PrismaPetImagesRepository implements IPetImagesRepository {
  async create(data: Prisma.PetImageUncheckedCreateInput) {
    const pet = await prisma.petImage.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.petImage.findMany({
      where: {
        petId: id,
      },
    })

    if (!pet) {
      return null
    }

    return pet
  }
}
