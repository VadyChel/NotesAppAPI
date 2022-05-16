import mongoose from 'mongoose'

const ActivationMailsSchema = new mongoose.Schema({
  userId: { type: String, required: true }, activationCode: { type: String, required: true, index: true }
}, { collection: 'activationMails' })

const ActivationMails = mongoose.model('ActivationMails', ActivationMailsSchema)
export default ActivationMails