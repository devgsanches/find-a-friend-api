import type { IPetsRepository } from '../repositories/interfaces/pets-repository'

import type { Age, Pet } from '../../../generated/prisma'

interface ICreatePetRequest {
  city: string
  age?: Age
  energyLevel?: number
  size?: string
  levelOfIndependence?: string
}

interface ICreatePetResponse {
  pets: Pet[]
}

export class GetPetsByFiltersUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    city,
    age,
    energyLevel,
    size,
    levelOfIndependence,
  }: ICreatePetRequest): Promise<ICreatePetResponse> {
    const pets = await this.petsRepository.findByFilters({
      city,
      age,
      energyLevel,
      size,
      levelOfIndependence,
    })

    return { pets }
  }
}
