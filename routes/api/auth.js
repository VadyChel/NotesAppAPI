import Auth from '../../models/auth.js'
import bcrypt from 'bcrypt'
import Token from '../../models/tokens.js'
import { v4 as uuidv4 } from 'uuid'
import User from '../../models/users.js'

export default async (fastify, opts) => {
  fastify.post('/register', async (request, reply) => {
    const { username, password, email } = request.body
    const foundAuthWithSpecifiedEmail = await Auth.findOne({ email })
    if(foundAuthWithSpecifiedEmail) throw new Error('Specified email already used')

    const userId = uuidv4()
    await Auth.create({
      userId, username, passwordHash: await bcrypt.hash(password, 8), email
    })
    await User.create({ userId, username, email })
    return await Token.create({ userId })
  })

  fastify.post('/login', async (request, reply) => {
    const { password, email } = request.body
    const foundAuth = await Auth.findOne({ email })
    if(!foundAuth) throw new Error('You don\'t registered')

    const isMatch = await bcrypt.compare(password, foundAuth.passwordHash)
    if(!isMatch) {
      throw new Error('Wrong password')
    }

    const foundToken = await Token.findOne({ userId: foundAuth.userId })
    if(!foundToken) return await Token.create({ userId: foundAuth.userId })

    return foundToken
  })

  fastify.post('/refresh', {
    preHandler: (req, rep, done) => {
      if(!req.headers.authorization) {
        throw new Error('No authorization headers')
      }

      const authorization = req.headers.authorization.split(' ')[1]
      if(!authorization) {
        throw new Error('No authorization headers')
      }

      req.authorization = authorization
      done()
    }
  }, async (request, reply) => {
    return await Token.refreshAccessToken(request.authorization)
  })

  fastify.post('/revoke', {
    preHandler: (req, rep, done) => {
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
  }, async (request, reply) => {
    const [accessToken, userId] = request.authorization
    if(!userId) {
      throw new Error('User id doesn\'t specified')
    }

    await Token.deleteOne({ accessToken: accessToken.trim(), userId: userId.trim() })
    return { success: true }
  })
}