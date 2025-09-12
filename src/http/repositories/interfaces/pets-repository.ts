import type { Prisma, Pet } from '../../../../generated/prisma'

export interface IFindByfiltersParams {
  city: string
  age?: string
  energyLevel?: number
  size?: string
  levelOfIndependence?: string
}

export interface IPetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findByFilters(params: IFindByfiltersParams): Promise<Pet[]>
}
