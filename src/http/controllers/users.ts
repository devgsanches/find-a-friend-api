import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeOrgAuthenticateUseCase } from '../use-cases/factories/make-org-authenticate-use-case'
import { makeUserAuthenticateUseCase } from '../use-cases/factories/make-user-authenticate-use-case'
import { makeCreateUserUseCase } from '../use-cases/factories/make-create-user-use-case'
import { InvalidCredentialsError } from '../use-cases/errors/invalid-credentials-error'

export class UsersController {
  async store(req: FastifyRequest, res: FastifyReply) {
    const schema = z.object({
      name: z.string('Name is required.'),
      email: z.email('Email is required.'),
      password: z.string('Password is required.'),
    })

    const { name, email, password } = schema.parse(req.body)

    const createUserUseCase = makeCreateUserUseCase()

    const { user } = await createUserUseCase.execute({
      name,
      email,
      password,
    })

    const { passwordHash, ...userWithoutPassword } = user

    return res.status(201).send({ userWithoutPassword })
  }

  async signIn(req: FastifyRequest, res: FastifyReply) {
    const schema = z.object({
      email: z.string('Email is required.'),
      password: z
        .string('Password is required and must be at least 6 characters long.')
        .min(6),
    })

    const { email, password } = schema.parse(req.body)

    try {
      const userAuthenticateUseCase = makeUserAuthenticateUseCase()

      const { user } = await userAuthenticateUseCase.execute({
        email,
        password,
      })

      const token = await res.jwtSign(
        {
          role: user.role,
        },
        {
          sign: {
            sub: user.id,
          },
        }
      )

      const refreshToken = await res.jwtSign(
        {
          role: user.role,
        },
        {
          sign: {
            sub: user.id,
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
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return res.status(401).send({ message: 'Invalid Credentials' })
      }
    }
  }
}
