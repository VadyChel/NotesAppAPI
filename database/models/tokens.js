import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config.js'

const TokensSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  accessToken: { type: String, default: '' },
  refreshToken: { type: String, default: '' },
  expiresIn: { type: Number, default: 0 }
}, { collection: 'tokens' })

async function refreshAccessToken(refreshToken) {
  const foundToken = await Token.findOne({ refreshToken })
  if(!foundToken) {
    throw Error('Not found token')
  }

  const newAccessToken = jwt.sign({
    userId: foundToken.userId
  }, JWT_SECRET, { expiresIn: '5d' })
  await Token.updateOne({ refreshToken }, {
    accessToken: newAccessToken, expiresIn: new Date().getTime() + (3600 * 24 * 5)
  })
  return await Token.findOne({ accessToken: newAccessToken })
}

function tokensGenerator(next) {
  this.accessToken = jwt.sign({ userId: this.userId }, JWT_SECRET, { expiresIn: '5d' })
  this.refreshToken = jwt.sign({
    userId: this.userId, accessToken: this.accessToken
  }, JWT_SECRET, { expiresIn: '30d' })
  this.expiresIn = new Date().getTime() + (3600 * 24 * 5) // + 5 days
  next()
}

TokensSchema.pre('save', tokensGenerator)
TokensSchema.statics.refreshAccessToken = refreshAccessToken

const Token = mongoose.model('Token', TokensSchema)
export default Token