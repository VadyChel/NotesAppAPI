import AuthController from '../../controllers/auth.js'
import { LoginRouteSchema, RegisterRouteSchema } from '../../validationSchemas/auth.route.js'

export default async (fastify, opts) => {
  fastify.post('/register', { schema: RegisterRouteSchema }, AuthController.register)
  fastify.post('/login', { schema: LoginRouteSchema }, AuthController.login)
  fastify.get('/refresh', AuthController.refreshToken)
  fastify.post('/revoke', AuthController.revokeToken)
}