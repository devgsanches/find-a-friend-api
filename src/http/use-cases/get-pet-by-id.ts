import type { IPetsRepository } from '../repositories/interfaces/pets-repository'

import type { Pet } from '../../../generated/prisma'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IGetPetByIdRequest {
  id: string
}

interface IGetPetByIdResponse {
  pet: Pet
}

export class GetPetByIdUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({ id }: IGetPetByIdRequest): Promise<IGetPetByIdResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError('Pet not found.')
    }

    return { pet }
  }
}
