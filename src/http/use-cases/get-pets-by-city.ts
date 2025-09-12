import type { IPetsRepository } from '../repositories/interfaces/pets-repository'

import type { Pet } from '../../../generated/prisma'

interface ICreatePetRequest {
  city: string
}

interface ICreatePetResponse {
  pets: Pet[]
}

export class GetPetsByCityUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({ city }: ICreatePetRequest): Promise<ICreatePetResponse> {
    const pets = await this.petsRepository.findByCity(city)

    return { pets }
  }
}
