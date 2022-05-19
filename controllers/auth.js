import AuthService from '../services/auth.js'

class AuthController {
  MAX_REFRESH_TOKEN_COOKIE_AGE = this.MAX_REFRESH_TOKEN_COOKIE_AGE

  async register(req, rep) {
    const { username, password, email } = req.body
    const userData = await AuthService.register(password, email, username)
    return rep.setCookie('refreshToken', userData.tokens.refreshToken, {
      maxAge: this.MAX_REFRESH_TOKEN_COOKIE_AGE, httpOnly: true
    }).send(userData)
  }

  async login(req, rep) {
    const { password, email } = req.body
    const userData = await AuthService.login(password, email)
    return rep.setCookie('refreshToken', userData.tokens.refreshToken, {
      maxAge: this.MAX_REFRESH_TOKEN_COOKIE_AGE, httpOnly: true
    }).send(userData)
  }

  async refreshToken(req, rep) {
    const refreshToken = req.cookies.refreshToken
    const userData = await AuthService.refresh(refreshToken)
    return rep.setCookie('refreshToken', userData.tokens.refreshToken, {
      maxAge: this.MAX_REFRESH_TOKEN_COOKIE_AGE, httpOnly: true
    }).send(userData)
  }

  async revokeToken(req, rep) {
    const refreshToken = req.cookies.refreshToken
    const userData = await AuthService.revoke(refreshToken)
    return rep.clearCookie('refreshToken').send(userData)
  }
}

export default new AuthController()