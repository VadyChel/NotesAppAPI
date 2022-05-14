export const NewNotesRouteSchema = {
  body: {
    type: 'object', properties: {
      notesToAdd: { type: 'array', items: { $ref: 'http://vschemas/note.json#' } }
    }, required: ['notesToAdd']
  }
}

export const RemoveNotesRouteSchema = {
  body: {
    type: 'object', properties: {
      notesToRemove: { type: 'array', items: { type: 'string' } }
    }, required: ['notesToRemove']
  }
}

export const UpdateNotesRouteSchema = {
  body: {
    type: 'object', properties: {
      changedNotes: { type: 'array', items: { $ref: 'http://vschemas/note.json#' } }
    }, required: ['changedNotes']
  }
}

export const GetNotesRouteSchema = {
  params: {
    type: 'object', properties: {
      pageId: { type: 'string' }
    }, required: ['pageId']
  }
}