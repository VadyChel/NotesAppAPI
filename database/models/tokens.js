import mongoose from 'mongoose'

const TokensSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, refreshToken: { type: String, default: '' }
}, { collection: 'tokens' })

const Token = mongoose.model('Token', TokensSchema)
export default Token