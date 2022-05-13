import AuthController from '../../controllers/auth.js'
import { LoginRouteSchema, RegisterRouteSchema } from '../../validationSchemas/auth.route.js'

export default async (fastify, opts) => {
  fastify.post('/register', { schema: RegisterRouteSchema }, AuthController.register)
  fastify.post('/login', { schema: LoginRouteSchema }, AuthController.login)
  fastify.post('/refresh', { preHandler: AuthController.checkAuthorizationHeaders }, AuthController.refreshToken)
  fastify.post('/revoke', { preHandler: AuthController.checkAuthorizationHeaders }, AuthController.revokeToken)
}