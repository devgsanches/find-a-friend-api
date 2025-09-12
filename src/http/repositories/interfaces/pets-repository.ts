import type { Prisma, Pet } from '../../../../generated/prisma'

export interface IPetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findByCity(city: string): Promise<Pet[]>
}
