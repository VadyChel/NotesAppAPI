import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'
import User from '../database/models/users.js'

export async function checkAuthorizationHeaders(req, rep) {
  if(!req.headers.authorization) {
    throw new Error('No authorization headers')
  }

  const authorization = req.headers.authorization.split(' ').slice(1)
  if(!authorization) {
    throw new Error('No authorization headers')
  }

  jwt.verify(authorization[0], JWT_SECRET)
  const { userId } = jwt.decode(authorization[0], JWT_SECRET)

  const foundUserWithAuthorization = await User.findOne({ userId })
  if(!foundUserWithAuthorization) throw new Error('Unknown user')

  req.authorization = authorization
  req.currentUser = foundUserWithAuthorization
}
