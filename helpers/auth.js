import User from '../database/models/users.js'
import TokenService from '../services/tokens.js'
import UnauthorizedError from '../exceptions/unauthorizedError.js'
import NotFoundError from '../exceptions/notFoundError.js'

export async function checkAuthorizationHeaders(req, rep) {
  if(!req.headers.authorization) {
    throw new UnauthorizedError()
  }

  const accessToken = req.headers.authorization.split(' ')[1]
  if(!accessToken) {
    throw new UnauthorizedError()
  }

  const userData = TokenService.validateAccessToken(accessToken)
  if(!userData) throw new UnauthorizedError()

  const foundUserWithAuthorization = await User.findOne({ userId: userData.userId })
  if(!foundUserWithAuthorization) throw new NotFoundError('User not found')

  req.accessToken = accessToken
  req.currentUser = foundUserWithAuthorization
}
