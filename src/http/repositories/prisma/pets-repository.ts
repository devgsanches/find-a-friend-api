import { ResourceAlreadyExistsError } from '@/http/use-cases/errors/resource-already-exists-error'
import type { Pet, Prisma } from '../../../../generated/prisma'
import { prisma } from '../../../database/prisma'
// import type { Prisma } from 'generated/prisma'
import type {
  IFindByfiltersParams,
  IPetsRepository,
} from '../interfaces/pets-repository'

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

  async findByFilters(params: IFindByfiltersParams) {
    const pets = await prisma.pet.findMany({
      where: {
        city: {
          contains: params.city,
          mode: 'insensitive',
        },
        age: {
          equals: params.age,
        },
        energyLevel: {
          equals: params.energyLevel,
        },
        size: {
          contains: params.size,
          mode: 'insensitive',
        },
        levelOfIndependence: {
          contains: params.levelOfIndependence,
          mode: 'insensitive',
        },
      },
    })
    return pets
  }
}
