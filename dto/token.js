export default class TokenDTO {
  constructor(model) {
    this.userId = model.userId
    this.refreshToken = model.refreshToken
  }
}