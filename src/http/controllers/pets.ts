import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreatePetUseCase } from '../use-cases/factories/make-create-pet-use-case'

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
}
