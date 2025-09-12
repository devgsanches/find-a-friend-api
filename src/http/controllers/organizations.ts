import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreatePetUseCase } from '../use-cases/factories/make-create-pet-use-case'
import { makeCreateOrganizationUseCase } from '../use-cases/factories/make-create-organization-use-case'

export class OrganizationsController {
  async store(req: FastifyRequest, res: FastifyReply) {
    const schema = z.object({
      responsible_name: z.string('Responsible name is required.'),
      email: z.string('Email is required.'),
      password: z.string('Password is required.'),
      cep: z.string('CEP is required.'),
      city: z.string('City is required.'),
      address: z.string('Address is required.'),
      phone: z.string('Phone is required.'),
    })

    const { responsible_name, email, password, cep, city, address, phone } =
      schema.parse(req.body)

    const createOrganizationUseCase = makeCreateOrganizationUseCase()

    const { organization } = await createOrganizationUseCase.execute({
      responsibleName: responsible_name,
      email,
      passwordHash: password,
      cep,
      city,
      address,
      phone,
    })

    return res.status(201).send({ organization })
  }
}
