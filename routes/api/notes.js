import {
  GetNotesRouteSchema, NewNotesRouteSchema, RemoveNotesRouteSchema, UpdateNotesRouteSchema
} from '../../validationSchemas/notes.route.js'
import NotesController from '../../controllers/notes.js'
import { checkAuthorizationHeaders } from '../../helpers/auth.js'

export default async (fastify, opts) => {
  fastify.get('/notes/:pageId', {
    schema: GetNotesRouteSchema, preHandler: checkAuthorizationHeaders
  }, NotesController.getNotes)
  fastify.post('/notes/new', {
    schema: NewNotesRouteSchema, preHandler: checkAuthorizationHeaders
  }, NotesController.createMultipleNotes)
  fastify.post('/notes/remove', {
    schema: RemoveNotesRouteSchema, preHandler: checkAuthorizationHeaders
  }, NotesController.removeMultipleNotes)
  fastify.post('/notes/update', {
    schema: UpdateNotesRouteSchema, preHandler: checkAuthorizationHeaders
  }, NotesController.updateMultipleNotes)
}