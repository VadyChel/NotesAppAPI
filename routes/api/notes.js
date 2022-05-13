import { NewRouteSchema, RemoveRouteSchema, UpdateRouteSchema } from '../../validationSchemas/notes.route.js'
import NotesController from '../../controllers/notes.js'

export default async (fastify, opts) => {
  fastify.post('/new', { schema: NewRouteSchema }, NotesController.createMultipleNotes)
  fastify.post('/remove', { schema: RemoveRouteSchema }, NotesController.removeMultipleNotes)
  fastify.post('/update', { schema: UpdateRouteSchema }, NotesController.updateMultipleNotes)
}