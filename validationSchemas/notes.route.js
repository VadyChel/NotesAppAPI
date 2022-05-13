export const NewRouteSchema = {
  body: {
    type: 'object',
    properties: {
      notesToAdd: { type: 'array', items: { $ref: 'http://vschemas/note.json#' } }
    },
    required: ['notesToAdd']
  }
}

export const RemoveRouteSchema = {
  body: {
    type: 'object',
    properties: {
      notesToRemove: { type: 'array', items: { type: 'string' } }
    },
    required: ['notesToRemove']
  }
}

export const UpdateRouteSchema = {
  body: {
    type: 'object',
    properties: {
      changedNotes: { type: 'array', items: { $ref: 'http://vschemas/note.json#' } }
    },
    required: ['changedNotes']
  }
}