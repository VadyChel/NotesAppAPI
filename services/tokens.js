import jwt from 'jsonwebtoken'
import Token from '../database/models/tokens.js'
import TokenDTO from '../dto/token.js'

class TokensService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return { accessToken, refreshToken }
  }

  validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    } catch(e) {
      return null
    }
  }

  validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
    } catch(e) {
      return null
    }
  }

  async saveToken(userId, refreshToken) {
    const foundToken = await Token.findOne({ userId })
    if(foundToken) {
      foundToken.refreshToken = refreshToken
      return await foundToken.save()
    }

    return new TokenDTO(await Token.create({ userId, refreshToken }))
  }

  async removeToken(refreshToken) {
    return await Token.deleteOne({ refreshToken })
  }

  async findToken(refreshToken) {
    const foundToken = await Token.findOne({ refreshToken })
    if(!foundToken) return null

    return new TokenDTO(foundToken)
  }
}

export default new TokensService()