import { randomUUID } from 'node:crypto'
import type { Prisma, Pet } from '../../../../generated/prisma'
import {
  type IFindByfiltersParams,
  type IPetsRepository,
} from '../interfaces/pets-repository'
import { ResourceAlreadyExistsError } from '@/http/use-cases/errors/resource-already-exists-error'

export class InMemoryPetsRepository implements IPetsRepository {
  private pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energyLevel: data.energyLevel,
      levelOfIndependence: data.levelOfIndependence,
      environment: data.environment,
      city: data.city,
      organizationId: data.organizationId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.pets.push(pet)

    return pet
  }

  async findById(id: string) {
    const petAlreadyExists = this.pets.find((pet) => pet.id === id)

    if (!petAlreadyExists) {
      return null
    }

    return petAlreadyExists
  }

  async findByFilters(params: IFindByfiltersParams) {
    const pets = this.pets.filter((pet) => {
      return (
        pet.city.includes(params.city) &&
        pet.age === params.age &&
        pet.energyLevel === params.energyLevel &&
        pet.size === params.size &&
        pet.levelOfIndependence === params.levelOfIndependence
      )
    })

    return pets
  }
}
