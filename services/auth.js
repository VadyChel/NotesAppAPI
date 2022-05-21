import Auth from '../database/models/auth.js'
import bcrypt from 'bcrypt'
import MailService from '../services/mails.js'
import UsersService from '../services/users.js'
import TokensService from '../services/tokens.js'
import { v4 as uuid4 } from 'uuid'
import ActivationMails from '../database/models/activationMails.js'
import UnauthorizedError from '../exceptions/unauthorizedError.js'
import BadRequestError from '../exceptions/badRequestError.js'
import UserDTO from '../dto/user.js'

class AuthService {
  async refresh(refreshToken) {
    if(!refreshToken) throw new UnauthorizedError()

    const userData = TokensService.validateRefreshToken(refreshToken)
    const foundToken = TokensService.findToken(refreshToken)
    if(!userData || !foundToken) throw new UnauthorizedError()

    const userRaw = await UsersService.getUser(userData.userId)
    const user = new UserDTO(userRaw)
    const tokens = TokensService.generateTokens({ userId: userData.userId, email: user.email })

    await TokensService.saveToken(userData.userId, tokens.refreshToken)
    return { tokens, user }
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

    const newUserRaw = await UsersService.createUser(userId, email, username)
    const newUser = new UserDTO(newUserRaw)
    const tokens = TokensService.generateTokens({ userId, email })
    await TokensService.saveToken(userId, tokens.refreshToken)

    await MailService.sendActivationMail(email, activationLink, username)

    return { tokens, user: newUser }
  }

  async login(password, email) {
    const foundAuth = await Auth.findOne({ email })
    if(!foundAuth) throw new BadRequestError('User is not registered')

    const isPasswordCorrect = await bcrypt.compare(password, foundAuth.passwordHash)
    if(!isPasswordCorrect) throw new BadRequestError('Invalid password')

    const tokens = TokensService.generateTokens({ userId: foundAuth.userId, email })
    await TokensService.saveToken(foundAuth.userId, tokens.refreshToken)
    const userRaw = await UsersService.getUser(foundAuth.userId)
    const user = new UserDTO(userRaw)

    return { tokens, user }

  }
}

export default new AuthService()