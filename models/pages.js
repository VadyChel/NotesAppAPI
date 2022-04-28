import mongoose from 'mongoose'

const PagesSchema = new mongoose.Schema({
  root: { type: Boolean, default: true },
  parent: { type: String, default: null },
  nestedPages: [Number],
  position: { type: Number, default: 0 },
  author: { type: String },
  name: { type: String, required: true }
}, { collection: 'pages' })

async function autoPosition(next) {
  const currentAuthorPages = await Page.find({ author: this.author }).sort('-position')
  this.position = currentAuthorPages[0].position+1
  next()
}

PagesSchema.pre('save', autoPosition)

const Page = mongoose.model('Page', PagesSchema)
export default Page