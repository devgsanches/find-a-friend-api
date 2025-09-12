import { FastifyInstance } from 'fastify'
import { petsRoutes } from './pets'
import { organizationsRoutes } from './organizations'

export async function appRoutes(fastify: FastifyInstance) {
  fastify.register(petsRoutes, {
    prefix: '/pets',
  })
  fastify.register(organizationsRoutes, {
    prefix: '/organizations',
  })
}
