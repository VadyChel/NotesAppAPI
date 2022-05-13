import Note from '../database/models/notes.js'

class NotesController {
  async createMultipleNotes(req, rep) {
    await Note.insertMany(req.body.notesToAdd)
    return { addedNotes: req.body.notesToAdd.length }
  }

  async removeMultipleNotes(req, rep) {
    await Note.deleteMany({ noteId: req.body.notesToRemove })
    return { removedNotes: req.body.notesToRemove.length }
  }

  async updateMultipleNotes(req, rep) {
    const operations = req.body.changedNotes.map((note) => ({
      updateOne: {
        filter: { noteId: note.noteId }, update: { $set: note }
      }
    }))
    await Note.bulkWrite(operations)
    return { changedNotes: req.body.changedNotes.length }
  }
}

export default new NotesController()