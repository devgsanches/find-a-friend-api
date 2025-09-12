import type { Prisma, Pet } from '../../../../generated/prisma'

export interface IPetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByCity(city: string): Promise<Pet[]>
}
