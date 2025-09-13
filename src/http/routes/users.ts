import { FastifyInstance } from 'fastify'

import { UsersController } from '../controllers/users'

const usersController = new UsersController()
export async function usersRoutes(app: FastifyInstance) {
  app.post('/', usersController.store)
  app.post('/login', usersController.signIn)
}
