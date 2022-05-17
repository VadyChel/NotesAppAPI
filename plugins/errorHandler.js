import fastifyPlugin from 'fastify-plugin'
import ApiError from '../exceptions/apiError.js'

export default fastifyPlugin(async (fastify, opts) => {
  fastify.setErrorHandler(async (error, req, rep) => {
    if(typeof error === ApiError) {
      rep.status(error.statusCode).send({ message: error.message })
    }

    throw error
  })
})