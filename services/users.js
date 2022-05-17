import User from '../database/models/users.js'
import ActivationMails from '../database/models/activationMails.js'
import NotFoundError from '../exceptions/notFoundError.js'

class UsersService {
  async getUser(userId) {
    return await User.find({ userId })
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
}

export default new UsersService()