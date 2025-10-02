import { PrismaPetImagesRepository } from '../../repositories/prisma/pet-images-repository'
import { CreatePetImageUseCase } from '../create-pet-image'

export function makeCreatePetImageUseCase() {
  const petImagesRepository = new PrismaPetImagesRepository()
  const createPetImageUseCase = new CreatePetImageUseCase(petImagesRepository)

  return createPetImageUseCase
}
