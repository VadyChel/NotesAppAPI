export default class NoteDTO {
  constructor(model) {
    this.noteId = model.noteId
    this.page = model.page
    this.content = model.content
    this.styles = model.styles
    this.position = model.position
    this.author = model.author
  }
}