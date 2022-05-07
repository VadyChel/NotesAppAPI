export const NoteVSchema = {
  $id: 'http://vschemas/note.json',
  type: 'object',
  properties: {
    noteId: { type: 'string' },
    page: { type: 'string' },
    content: { type: 'string' },
    styles: { type: 'object' },
    position: { type: 'number' },
    author: { type: 'string' }
  },
  required: ['page', 'content', 'position']
}