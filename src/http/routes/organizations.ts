import { FastifyInstance } from 'fastify'

import { OrganizationsController } from '../controllers/organizations'

const organizationsController = new OrganizationsController()
export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/', organizationsController.store)
}
