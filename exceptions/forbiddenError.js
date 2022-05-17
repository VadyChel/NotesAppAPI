import ApiError from './apiError.js'

export default class ForbiddenError extends ApiError {
  constructor() {
    super('You don\'t have permissions', 403)
  }
}