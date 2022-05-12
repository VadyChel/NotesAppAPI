import fastifyPlugin from 'fastify-plugin'
import { MONGO_CLUSTER, MONGO_DATABASE, MONGO_PASSWORD, MONGO_USERNAME } from '../config.js'
import mongoose from 'mongoose'

export default fastifyPlugin(async (fastify, options) => {
  mongoose.connection.on('connect', () => {
    fastify.log.info(`MongoDB connected with user ${MONGO_USERNAME} on ${MONGO_DATABASE} database`)
  })
  mongoose.connection.on('disconnect', () => {
    fastify.log.info('MongoDB disconnected')
  })
  try {
    await mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DATABASE}?retryWrites=true&w=majority`)
  } catch(e) {
    fastify.log.error(`Mongo error: ${e}`)
  }
})