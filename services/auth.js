import Auth from '../database/models/auth.js'
import bcrypt from 'bcrypt'
import MailService from '../services/mails.js'
import UsersService from '../services/users.js'
import TokensService from '../services/tokens.js'
import { v4 as uuid4 } from 'uuid'
import ActivationMails from '../database/models/activationMails.js'
import UnauthorizedError from '../exceptions/unauthorizedError.js'
import BadRequestError from '../exceptions/badRequestError.js'

class AuthService {
  async refresh(refreshToken) {
    if(!refreshToken) throw new UnauthorizedError()

    const userData = TokensService.validateRefreshToken(refreshToken)
    const foundToken = TokensService.findToken(refreshToken)
    if(!userData || !foundToken) throw new UnauthorizedError()

    const user = await UsersService.getUser(userData.userId)
    const tokens = TokensService.generateTokens({ userId: userData.userId, email: user.email, username: user.username })

    await TokensService.saveToken(userData.userId, tokens.refreshToken)
    return { ...tokens, user }
  }

  async revoke(refreshToken) {
    if(!refreshToken) throw new UnauthorizedError()

    return await TokensService.removeToken(refreshToken)
  }

  async register(password, email, username) {
    const foundAuth = await Auth.findOne({ email })
    if(foundAuth) throw new BadRequestError('This email is already using')

    const passwordHash = await bcrypt.hash(password, 8)
    const activationCode = uuid4()
    const userId = uuid4()
    const activationLink = `${process.env.API_URL}/api/users/activate/${activationCode}`

    await ActivationMails.create({ userId, activationCode })
    await Auth.create({ passwordHash, email, userId, username })

    const newUser = await UsersService.createUser(userId, email, username)
    const tokens = TokensService.generateTokens({ userId, email, username })
    await TokensService.saveToken(userId, tokens.refreshToken)

    await MailService.sendActivationMail(email, activationLink, username)

    return { ...tokens, currentUser: newUser }
  }

  async login(password, email) {
    const foundAuth = await Auth.findOne({ email })
    if(!foundAuth) throw new BadRequestError('User is not registered')

    const isPasswordCorrect = await bcrypt.compare(password, foundAuth.passwordHash)
    if(!isPasswordCorrect) throw new BadRequestError('Invalid password')

    const foundUser = await UsersService.getUser(foundAuth.userId)
    const tokens = TokensService.generateTokens({ userId: foundAuth.userId, email, username: foundUser.username })
    await TokensService.saveToken(foundAuth.userId, tokens.refreshToken)

    return { ...tokens, currentUser: await UsersService.getUser(foundAuth.userId) }

  }
}

export default new AuthService()