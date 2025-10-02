import type { FastifyInstance } from 'fastify'

import { PetsController } from '../controllers/pets'

const petsController = new PetsController()
export async function petsRoutes(app: FastifyInstance) {
  app.post('/', petsController.store)
  app.get('/:id', petsController.show)
  app.get('/', petsController.showByFilters)
}
