import fastifyPlugin from 'fastify-plugin'
import {NoteVSchema} from "../schemas/note.js";
import {PageVSchema} from "../schemas/page.js";

export default fastifyPlugin(async (fastify, options) => {
  fastify.addSchema(NoteVSchema)
  fastify.addSchema(PageVSchema)
})