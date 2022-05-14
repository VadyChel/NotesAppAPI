import Note from '../database/models/notes.js'

class NotesController {
  async getNotes(req, rep) {
    return await Note.find({ author: req.currentUser.userId })
  }

  async createMultipleNotes(req, rep) {
    const notesToAdd = req.body.notesToAdd.map((note) => {
      note.author = req.currentUser.userId
    })
    await Note.insertMany(notesToAdd)
    return { addedNotes: req.body.notesToAdd.length }
  }

  async removeMultipleNotes(req, rep) {
    req.body.notesToRemove.forEach((note) => {
      if(note.author !== req.currentUser.userId) throw new Error('You don\'t have permissions')
    })
    await Note.deleteMany({ noteId: req.body.notesToRemove })
    return { removedNotes: req.body.notesToRemove.length }
  }

  async updateMultipleNotes(req, rep) {
    req.body.changedNotes.forEach((note) => {
      if(note.author !== req.currentUser.userId) throw new Error('You don\'t have permissions')
    })

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