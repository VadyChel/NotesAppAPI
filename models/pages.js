import mongoose from 'mongoose'

const PagesSchema = new mongoose.Schema({
  root: { type: Boolean, default: false },
  parent: { type: String, default: null },
  nestedPages: [Number],
  position: {
    type: Number,
    required: true
  },
  name: { type: String, required: true }
}, { collection: 'pages' })
const Page = mongoose.model('Page', PagesSchema)
export default Page