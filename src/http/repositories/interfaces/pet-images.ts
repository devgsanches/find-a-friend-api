import type { Prisma, PetImage } from '../../../../generated/prisma'

export interface IPetImagesRepository {
  create(data: Prisma.PetImageUncheckedCreateInput): Promise<PetImage>
  findById(id: string): Promise<PetImage[] | null>
}
