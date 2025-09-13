import type { IPetsRepository } from '../repositories/interfaces/pets-repository'

import type { Age, Pet } from '../../../generated/prisma'

interface ICreatePetRequest {
  name: string
  about: string
  age: Age
  size: string
  energyLevel: number
  levelOfIndependence: string
  environment: string
  city: string
  organizationId: string
}

interface ICreatePetResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    levelOfIndependence,
    environment,
    city,
    organizationId,
  }: ICreatePetRequest): Promise<ICreatePetResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energyLevel,
      levelOfIndependence,
      environment,
      city,
      organizationId,
    })

    return { pet }
  }
}
