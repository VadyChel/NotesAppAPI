import NotesService from '../services/notes.js'

class NotesController {
  async getNotes(req, rep) {
    return await NotesService.getUserNotesByPage(req.currentUser.userId, req.params.pageId)
  }

  async createMultipleNotes(req, rep) {
    return await NotesService.insertNewNotes(req.currentUser.userId, req.body.notesToAdd)
  }

  async removeMultipleNotes(req, rep) {
    return await NotesService.removeManyNotes(req.currentUser.userId, req.body.notesToRemove)
  }

  async updateMultipleNotes(req, rep) {
    return await NotesService.updateManyNotes(req.currentUser.userId, req.body.changedNotes)
  }
}

export default new NotesController()