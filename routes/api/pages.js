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
  fastify.post('/pages/trash/:pageId', {
    schema: PagesDeleteRouteSchema, preHandler: checkAuthorizationHeaders
  }, PagesController.movePageToTrash)
  fastify.post('/pages/trash/:pageId/restore', {
    schema: PagesDeleteRouteSchema, preHandler: checkAuthorizationHeaders
  }, PagesController.restorePageFromTrash)
  fastify.get('/pages/trash', {
    preHandler: checkAuthorizationHeaders
  }, PagesController.getTrash)
  fastify.delete('/pages/trash', {
    preHandler: checkAuthorizationHeaders
  }, PagesController.deleteAllFromTrash)
  fastify.put('/pages/:pageId', {
    preHandler: checkAuthorizationHeaders
  }, PagesController.updatePage)
}