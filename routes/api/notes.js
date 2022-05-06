import Note from "../../models/notes.js";
import {NewRouteSchema, RemoveRouteSchema, UpdateRouteSchema} from "./notes.schemas.js";

export default async (fastify, opts) => {
  fastify.post('/new', { schema: NewRouteSchema }, async (request, reply) => {
    await Note.insertMany(request.body.notesToAdd)
    return { addedNotes: request.body.notesToAdd.length }
  })

  fastify.post('/remove', { schema: RemoveRouteSchema }, async (request, reply) => {
    await Note.deleteMany({ _id: request.body.notesToRemove })
    return { removedNotes: request.body.notesToRemove.length }
  })

  fastify.post('/update', { schema: UpdateRouteSchema }, async (request, reply) => {
    const operations = request.body.changedNotes.map((note) => ({
      updateOne: {
        filter: { _id: note._id },
        update: { $set: note }
      }
    }))
    await Note.bulkWrite(operations)
    return { changedNotes: request.body.changedNotes.length }
  })
}