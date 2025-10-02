import type { FastifyInstance } from 'fastify'
import { petsRoutes } from './pets'

import { organizationsRoutes } from './organizations'
import { usersRoutes } from './users'

export async function appRoutes(fastify: FastifyInstance) {
  fastify.register(usersRoutes, {
    prefix: '/users',
  })
  fastify.register(organizationsRoutes, {
    prefix: '/org',
  })
  fastify.register(petsRoutes, {
    prefix: '/pets',
  })
}
