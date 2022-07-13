import { checkAuthorizationHeaders } from '../../helpers/auth.js'
import UsersController from '../../controllers/users.js'
import { ActivateUserRouteSchema } from '../../validationSchemas/users.route.js'

export default async (fastify, opts) => {
  fastify.get('/users/@me', { preHandler: checkAuthorizationHeaders }, UsersController.getCurrentUser)
  fastify.get('/users/activate/:code', { schema: ActivateUserRouteSchema }, UsersController.activateUser)
  fastify.post('/users/activate/send', { preHandler: checkAuthorizationHeaders }, UsersController.sendActivationMailAgain)
}