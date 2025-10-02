import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreatePetUseCase } from '../use-cases/factories/make-create-pet-use-case'
import { makeGetPetsByFiltersUseCase } from '../use-cases/factories/make-get-pets-by-city-use-case'
import { makeGetPetByIdUseCase } from '../use-cases/factories/make-get-pet-by-id-use-case'
import { Age } from '../../../generated/prisma'

export class PetsController {
  async store(req: FastifyRequest, res: FastifyReply) {
    const schema = z.object({
      name: z.string('Name is required.'),
      about: z.string('About is required.'),
      age: z.nativeEnum(Age),
      size: z.string('Size is required.'),
      energy_level: z.number('Energy level is required.').min(1).max(5),
      level_of_independence: z.string('Level of independence is required.'),
      environment: z.string('Environment is required.'),
      city: z.string('City is required.'),
      organization_id: z.string('Organization id is required.'),
    })

    const {
      name,
      about,
      age,
      size,
      energy_level,
      level_of_independence,
      environment,
      city,
      organization_id,
    } = schema.parse(req.body)

    const createPetUseCase = makeCreatePetUseCase()

    const { pet } = await createPetUseCase.execute({
      name,
      about,
      age,
      size,
      energyLevel: energy_level,
      levelOfIndependence: level_of_independence,
      environment,
      city,
      organizationId: organization_id,
    })

    return res.status(201).send({ pet })
  }

  async show(req: FastifyRequest, res: FastifyReply) {
    const schema = z.object({
      id: z.string('Id is required.'),
    })

    const { id } = schema.parse(req.params)

    const getPetByIdUseCase = makeGetPetByIdUseCase()

    const { pet } = await getPetByIdUseCase.execute({
      id,
    })

    res.send({
      pet,
    })
  }

  async showByFilters(req: FastifyRequest, res: FastifyReply) {
    const schema = z.object({
      city: z.string('City is required.'),
      name: z.string().optional(),
    })

    const { city, name } = schema.parse(req.query)

    const getPetsByFiltersUseCase = makeGetPetsByFiltersUseCase()

    const { pets } = await getPetsByFiltersUseCase.execute({
      city,
      name,
    })

    return res.send({
      pets,
    })
  }
}
