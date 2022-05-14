class UsersController {
  async getCurrentUser(req, rep) {
    return req.currentUser
  }
}

export default new UsersController()