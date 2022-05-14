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

  // Check if refresh token is valid
  const decodedRefreshToken = jwt.decode(foundToken.refreshToken, JWT_SECRET)
  if(!decodedRefreshToken) throw new Error('Invalid refresh token')

  // Check if refresh token also expired
  if(decodedRefreshToken.expiresIn < new Date().getTime()) {
    await Token.deleteOne({ refreshToken })
    return await Token.create({ userId: foundToken.userId })
  }

  // Update current document with new access token
  const newAccessToken = jwt.sign({
    userId: foundToken.userId
  }, JWT_SECRET, { expiresIn: '5d' })
  console.log(await Token.updateOne({ refreshToken }, {
    accessToken: newAccessToken, expiresIn: new Date().getTime() + (3600 * 24 * 5)
  }))
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