import type { PetImage } from '../../../generated/prisma'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { IPetImagesRepository } from '../repositories/interfaces/pet-images'

interface ICreatePetImageRequest {
  url: string
  pet_id: string
}

interface ICreatePetImageResponse {
  petImages: PetImage
}

export class CreatePetImageUseCase {
  constructor(private petImagesRepository: IPetImagesRepository) {}

  async execute({
    url,
    pet_id,
  }: ICreatePetImageRequest): Promise<ICreatePetImageResponse> {
    const petImages = await this.petImagesRepository.create({
      url,
      petId: pet_id,
    })

    if (!petImages) {
      throw new ResourceNotFoundError('Pet not found.')
    }

    return { petImages }
  }
}
