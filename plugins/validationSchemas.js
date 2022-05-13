import fastifyPlugin from 'fastify-plugin'
import { NoteVSchema } from '../validationSchemas/note.js'
import { PageVSchema } from '../validationSchemas/page.js'

export default fastifyPlugin(async (fastify, options) => {
  fastify.addSchema(NoteVSchema)
  fastify.addSchema(PageVSchema)
})