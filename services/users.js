import User from '../database/models/users.js'
import ActivationMails from '../database/models/activationMails.js'
import NotFoundError from '../exceptions/notFoundError.js'
import MailService from './mails.js'
import ApiError from '../exceptions/apiError.js'

class UsersService {
  async getUser(userId) {
    return await User.findOne({ userId })
  }

  async editUser(userId, updatedUser) {
    return await User.updateOne({ userId }, updatedUser)
  }

  async createUser(userId, email, username) {
    return await User.create({ userId, email, username })
  }

  async activateUser(activationCode) {
    const foundActivationMail = await ActivationMails.findOneAndDelete({ activationCode })
    if(!foundActivationMail) throw new NotFoundError('Activation code not found')

    const foundUser = await this.getUser(foundActivationMail.userId)
    if(!foundUser) throw new NotFoundError('User not found')
    return await this.editUser(foundActivationMail.userId, { isActivated: true })
  }

  async sendActivationMailAgain(userId) {
    const foundActivationMail = await ActivationMails.findOne({ userId })
    if(!foundActivationMail) {
      throw new ApiError('You\'re already registered or provided userId doesn\'t exist', 400)
    }

    const activationLink = `${process.env.API_URL}/api/users/activate/${foundActivationMail.activationCode}`
    const user = await this.getUser(userId)

    await MailService.sendActivationMail(user.email, activationLink, user.username)
    return { success: true }
  }
}

export default new UsersService()