import ApiError from './apiError.js'

export default class BadRequestError extends ApiError {
  constructor(message) {
    super(message, 400)
  }
}