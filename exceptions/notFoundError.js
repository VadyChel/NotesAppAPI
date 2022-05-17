import ApiError from './apiError.js'

export default class NotFoundError extends ApiError {
  constructor(message) {
    super(message, 404)
  }
}