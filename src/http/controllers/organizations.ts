import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateOrganizationUseCase } from '../use-cases/factories/make-create-organization-use-case'
import { makeOrgAuthenticateUseCase } from '../use-cases/factories/make-org-authenticate-use-case'

export class OrganizationsController {
  async store(req: FastifyRequest, res: FastifyReply) {
    const schema = z.object({
      responsible_name: z.string('Responsible name is required.'),
      email: z.string('Email is required.'),
      password: z.string('Password is required.'),
      cep: z.string('CEP is required.').min(8).max(8),
      address: z.string('Address is required.'),
      phone: z.string('Phone is required.'),
    })
    const { responsible_name, email, password, cep, address, phone } =
      schema.parse(req.body)

    const createOrganizationUseCase = makeCreateOrganizationUseCase()

    const { organization } = await createOrganizationUseCase.execute({
      responsibleName: responsible_name,
      email,
      passwordHash: password,
      cep,
      address,
      phone,
    })

    return res.status(201).send({ organization })
  }

  async signIn(req: FastifyRequest, res: FastifyReply) {
    const schema = z.object({
      email: z.string('Email is required.'),
      password: z
        .string('Password is required and must be at least 6 characters long.')
        .min(6),
    })

    const { email, password } = schema.parse(req.body)

    const orgAuthenticateUseCase = makeOrgAuthenticateUseCase()

    const { org } = await orgAuthenticateUseCase.execute({
      email,
      password,
    })

    const token = await res.jwtSign(
      // {
      //   role: org.role,
      // },
      {
        sign: {
          sub: org.id,
        },
      }
    )

    const refreshToken = await res.jwtSign(
      // {
      //   role: org.role,
      // },
      {
        sign: {
          sub: org.id,
          expiresIn: '7d',
        },
      }
    )

    return res
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  }
}
