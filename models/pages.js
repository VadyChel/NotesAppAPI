import mongoose from 'mongoose'

const PagesSchema = new mongoose.Schema({
  root: { type: Boolean, default: true },
  parent: { type: String, default: null },
  nestedPages: [String],
  position: { type: Number, default: 0 },
  author: { type: String },
  name: { type: String, required: true },
  favourite: { type: Boolean, default: false }
}, { collection: 'pages' })

async function autoPosition(next) {
  const currentAuthorPages = await Page.find({ author: this.author }).sort('-position')
  this.position = currentAuthorPages.length > 0 ? currentAuthorPages[0].position+1 : 0
  next()
}

PagesSchema.pre('save', autoPosition)

const Page = mongoose.model('Page', PagesSchema)
export default Page