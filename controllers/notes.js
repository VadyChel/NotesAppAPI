import Note from '../database/models/notes.js'
import Page from '../database/models/pages.js'

class NotesController {
  async getNotes(req, rep) {
    const foundPage = await Page.findOne({ _id: req.params.pageId })
    if(foundPage.author !== req.currentUser.userId) throw new Error('You don\'t have permission')

    return await Note.find({ page: req.params.pageId })
  }

  async createMultipleNotes(req, rep) {
    const notesToAdd = req.body.notesToAdd.map((note) => ({
      ...note, author: req.currentUser.userId
    }))
    await Note.insertMany(notesToAdd)
    return { success: true }
  }

  async removeMultipleNotes(req, rep) {
    await Note.deleteMany({ noteId: req.body.notesToRemove, author: req.currentUser.userId })
    return { success: true }
  }

  async updateMultipleNotes(req, rep) {
    const operations = req.body.changedNotes.map((note) => ({
      updateOne: {
        filter: { noteId: note.noteId, author: req.currentUser.userId }, update: { $set: note }
      }
    }))
    await Note.bulkWrite(operations)
    return { changedNotes: req.body.changedNotes.length }
  }
}

export default new NotesController()