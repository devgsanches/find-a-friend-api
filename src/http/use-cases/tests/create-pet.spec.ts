import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from '../create-pet'
import { InMemoryPetsRepository } from '../../repositories/in-memory/pets-repository'

describe('Create Pet Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let sut: CreatePetUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'John Doe',
      about: 'John Doe',
      age: 'Filhote',
      size: 'SMALL',
      energyLevel: 1,
      levelOfIndependence: 'LOW',
      environment: 'SMALL',
      city: 'John Doe',
      organizationId: '1',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
