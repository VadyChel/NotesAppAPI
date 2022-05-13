import Token from '../database/models/tokens.js'
import Auth from '../database/models/auth.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import User from '../database/models/users.js'

class AuthController {
  checkAuthorizationHeaders(req, rep, done) {
    if(!req.headers.authorization) {
      throw new Error('No authorization headers')
    }

    const authorization = req.headers.authorization.split(' ').slice(1)
    if(!authorization) {
      throw new Error('No authorization headers')
    }

    req.authorization = authorization
    done()
  }

  async register(req, rep) {
    const { username, password, email } = req.body
    const foundAuthWithSpecifiedEmail = await Auth.findOne({ email })
    if(foundAuthWithSpecifiedEmail) throw new Error('Specified email already used')

    const userId = uuidv4()
    await Auth.create({
      userId, username, passwordHash: await bcrypt.hash(password, 8), email
    })
    await User.create({ userId, username, email })
    return await Token.create({ userId })
  }

  async login(req, rep) {
    const { password, email } = req.body
    const foundAuth = await Auth.findOne({ email })
    if(!foundAuth) throw new Error('You don\'t registered')

    const isMatch = await bcrypt.compare(password, foundAuth.passwordHash)
    if(!isMatch) {
      throw new Error('Wrong password')
    }

    const foundToken = await Token.findOne({ userId: foundAuth.userId })
    if(!foundToken) return await Token.create({ userId: foundAuth.userId })

    return foundToken
  }

  async refreshToken(req, rep) {
    return await Token.refreshAccessToken(req.authorization[0])
  }

  async revokeToken(req, rep) {
    const [accessToken, userId] = req.authorization
    if(!userId) {
      throw new Error('User id doesn\'t specified')
    }

    await Token.deleteOne({ accessToken: accessToken.trim(), userId: userId.trim() })
    return { success: true }
  }
}

export default new AuthController()