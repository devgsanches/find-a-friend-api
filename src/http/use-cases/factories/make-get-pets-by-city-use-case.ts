import { PrismaPetsRepository } from '../../repositories/prisma/pets-repository'
import { GetPetsByCityUseCase } from '../get-pets-by-filters'

export function makeGetPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const findPetsByCityUseCase = new GetPetsByCityUseCase(petsRepository)

  return findPetsByCityUseCase
}
