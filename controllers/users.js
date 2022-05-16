import UsersService from '../services/users.js'
import { CLIENT_URL } from '../config.js'

class UsersController {
  async getCurrentUser(req, rep) {
    return req.currentUser
  }

  async activateUser(req, rep) {
    try {
      await UsersService.activateUser(req.params.code)
    } finally {
      rep.redirect(CLIENT_URL)
    }
  }
}

export default new UsersController()