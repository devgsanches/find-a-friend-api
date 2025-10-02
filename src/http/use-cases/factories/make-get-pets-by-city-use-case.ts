import { PrismaPetsRepository } from '../../repositories/prisma/pets-repository'
import { GetPetsByFiltersUseCase } from '../get-pets-by-filters'

export function makeGetPetsByFiltersUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const findPetsByFiltersUseCase = new GetPetsByFiltersUseCase(petsRepository)

  return findPetsByFiltersUseCase
}
