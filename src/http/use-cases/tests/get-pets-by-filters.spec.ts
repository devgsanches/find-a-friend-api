import { expect, describe, it, beforeEach } from 'vitest'
import { GetPetsByFiltersUseCase } from '../get-pets-by-filters'
import { InMemoryPetsRepository } from '@/http/repositories/in-memory/pets-repository'

describe('Get Pets By Filters Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let sut: GetPetsByFiltersUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetsByFiltersUseCase(petsRepository)
  })

  it('should be get a pets by filters', async () => {
    const pet1 = await petsRepository.create({
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

    const pet2 = await petsRepository.create({
      name: 'Pet 2',
      about: 'About 2',
      age: 'Filhote',
      size: 'SMALL',
      energyLevel: 1,
      levelOfIndependence: 'LOW',
      environment: 'SMALL',
      city: 'São Paulo',
      organizationId: '1',
    })

    const pet3 = await petsRepository.create({
      name: 'Pet 3',
      about: 'About 3',
      age: 'Adulto',
      size: 'LARGE',
      energyLevel: 2,
      levelOfIndependence: 'MEDIUM',
      environment: 'SMALL',
      city: 'São Caetano',
      organizationId: '1',
    })

    const { pets } = await sut.execute({
      age: 'Filhote',
      energyLevel: 1,
      city: 'São Paulo',
      size: 'SMALL',
      levelOfIndependence: 'LOW',
    })

    expect(pets.length).toEqual(2)
  })
})
