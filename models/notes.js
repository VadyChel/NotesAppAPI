import mongoose from 'mongoose'

const NotesSchema = new mongoose.Schema({
  page: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Page' },
  content: { type: String, required: true },
  styles: { type: Object, default: {someK: 'someV'} },
  position: { type: Number, required: true },
  author: { type: String, required: true }
}, { collection: 'notes' })

const Note = mongoose.model('Note', NotesSchema)
export default Note