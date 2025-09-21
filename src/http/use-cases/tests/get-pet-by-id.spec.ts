import { expect, describe, it, beforeEach } from 'vitest'
import { GetPetByIdUseCase } from '../get-pet-by-id'
import type { Role } from 'generated/prisma'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryPetsRepository } from '@/http/repositories/in-memory/pets-repository'

describe('Get Pet By Id Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let sut: GetPetByIdUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetByIdUseCase(petsRepository)
  })

  it('should be get a pet by id', async () => {
    const pet = await petsRepository.create({
      name: 'Pet 1',
      about: 'About 1',
      age: 'Filhote',
      size: 'SMALL',
      energyLevel: 1,
      levelOfIndependence: 'LOW',
      environment: 'SMALL',
      city: 'São Paulo',
      organizationId: '1',
    })

    const { pet: petFound } = await sut.execute({
      id: pet.id,
    })

    expect(petFound.id).toEqual(expect.any(String))
  })

  it('should not be get a pet by id, because pet not exists', async () => {
    await expect(
      sut.execute({
        id: '1',
      })
    ).rejects.toThrow(ResourceNotFoundError)
  })
})
