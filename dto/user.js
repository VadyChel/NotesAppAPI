export default class UserDTO {
  constructor(model) {
    this.email = model.email
    this.username = model.username
    this.isActivated = model.isActivated
    this.userId = model.userId
  }
}