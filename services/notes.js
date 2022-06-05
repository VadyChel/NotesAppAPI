import Note from '../database/models/notes.js'
import Page from '../database/models/pages.js'
import ForbiddenError from '../exceptions/forbiddenError.js'
import { convertToDTOs } from '../helpers/other.js'
import NoteDTO from '../dto/note.js'

class NotesService {
  async getUserNotesByPage(userId, pageId) {
    const foundPage = await Page.findOne({ _id: pageId })
    if(foundPage.author !== userId) throw new ForbiddenError()

    return convertToDTOs(await Note.find({ author: userId, page: pageId }), NoteDTO)
  }

  async insertNewNotes(userId, newNotes) {
    const notesToAdd = newNotes.map((note) => ({
      ...note, author: userId
    }))
    return await Note.insertMany(notesToAdd)
  }

  async removeManyNotes(userId, notesIds) {
    return await Note.deleteMany({ noteId: notesIds, author: userId })
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