import UsersService from '../services/users.js'

class UsersController {
  async getCurrentUser(req, rep) {
    return req.currentUser
  }

  async activateUser(req, rep) {
    try {
      await UsersService.activateUser(req.params.code)
    } finally {
      rep.redirect(process.env.CLIENT_URL)
    }
  }

  async sendActivationMailAgain(req, rep) {
    return await UsersService.sendActivationMailAgain(req.currentUser.userId)
  }
}

export default new UsersController()