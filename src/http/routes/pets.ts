import { FastifyInstance } from 'fastify'

import { PetsController } from '../controllers/pets'

const petsController = new PetsController()
export async function petsRoutes(app: FastifyInstance) {
  app.post('/', petsController.store)
}
