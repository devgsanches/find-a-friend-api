import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreatePetUseCase } from '../use-cases/factories/make-create-pet-use-case'
import { makeGetPetsByCityUseCase } from '../use-cases/factories/make-get-pets-by-city-use-case'
import { makeGetPetByIdUseCase } from '../use-cases/factories/make-get-pet-by-id-use-case'

export class PetsController {
  async store(req: FastifyRequest, res: FastifyReply) {
    const schema = z.object({
      name: z.string('Name is required.'),
      about: z.string('About is required.'),
      age: z.number('Age is required.'),
      size: z.string('Size is required.'),
      energy_level: z.string('Energy level is required.'),
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

  async showByCity(req: FastifyRequest, res: FastifyReply) {
    const schema = z.object({
      city: z.string('City name is required.'),
    })

    const { city } = schema.parse(req.query)

    const getPetsByCityUseCase = makeGetPetsByCityUseCase()

    const { pets } = await getPetsByCityUseCase.execute({
      city,
    })

    return res.send({
      pets,
    })
  }
}
