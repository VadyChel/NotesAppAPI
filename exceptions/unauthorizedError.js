import ApiError from './apiError.js'

export default class UnauthorizedError extends ApiError {
  constructor() {
    super('You don\'t authorized', 401)
  }
}