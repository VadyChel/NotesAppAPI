import Note from '../database/models/notes.js'
import Page from '../database/models/pages.js'

class NotesService {
  async getUserNotesByPage(userId, pageId) {
    const foundPage = await Page.findOne({ _id: pageId })
    if(foundPage.author !== userId) throw new Error('You don\'t have permission')

    return await Note.find({ author: userId, pageId })
  }

  async insertNewNotes(userId, newNotes) {
    const notesToAdd = newNotes.map((note) => ({
      ...note, author: userId
    }))
    await Note.insertMany(notesToAdd)
  }

  async removeManyNotes(userId, notesIds) {
    await Note.deleteMany({ noteId: notesIds, author: userId })
  }

  async updateManyNotes(userId, updatedNotes) {
    const operations = updatedNotes.map((note) => ({
      updateOne: {
        filter: { noteId: note.noteId, author: userId }, update: { $set: note }
      }
    }))
    return await Note.bulkWrite(operations)
  }
}

export default new NotesService()