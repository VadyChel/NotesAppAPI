import User from '../database/models/users.js'
import TokenService from '../services/tokens.js'

export async function checkAuthorizationHeaders(req, rep) {
  if(!req.headers.authorization) {
    throw new Error('No authorization headers')
  }

  const accessToken = req.headers.authorization.split(' ')[1]
  if(!accessToken) {
    throw new Error('No authorization headers')
  }

  const userData = TokenService.validateAccessToken(accessToken)
  if(!userData) throw new Error('Unauthorized')

  const foundUserWithAuthorization = await User.findOne({ userId: userData.userId })
  if(!foundUserWithAuthorization) throw new Error('Unknown user')

  req.accessToken = accessToken
  req.currentUser = foundUserWithAuthorization
}
