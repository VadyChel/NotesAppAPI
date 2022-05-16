import User from '../database/models/users.js'
import ActivationMails from '../database/models/activationMails.js'

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
    if(!foundActivationMail) throw new Error('Not found activation code')

    const foundUser = await this.getUser(foundActivationMail.userId)
    if(!foundUser) throw new Error('Not found user')
    return await this.editUser(foundActivationMail.userId, { isActivated: true })
  }
}

export default new UsersService()