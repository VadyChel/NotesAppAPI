import { checkAuthorizationHeaders } from '../../helpers/auth.js'
import UsersController from '../../controllers/users.js'

export default async (fastify, opts) => {
  fastify.get('/users/@me', { preHandler: checkAuthorizationHeaders }, UsersController.getCurrentUser)
}