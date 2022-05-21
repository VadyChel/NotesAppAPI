import PagesController from '../../controllers/pages.js'
import { checkAuthorizationHeaders } from '../../helpers/auth.js'
import { PagesDeleteRouteSchema, PagesRouteSchema } from '../../validationSchemas/pages.route.js'

export default async (fastify, opts) => {
  fastify.get('/pages', { preHandler: checkAuthorizationHeaders }, PagesController.getUserPages)
  fastify.post('/pages', {
    schema: PagesRouteSchema, preHandler: checkAuthorizationHeaders
  }, PagesController.createPage)
  fastify.delete('/pages/:pageId', {
    schema: PagesDeleteRouteSchema, preHandler: checkAuthorizationHeaders
  }, PagesController.deletePage)
  fastify.put('/pages/:pageId', {
    preHandler: checkAuthorizationHeaders
  }, PagesController.updatePage)
}