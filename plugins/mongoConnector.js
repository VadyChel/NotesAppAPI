import fastifyPlugin from 'fastify-plugin'
import mongoose from 'mongoose'

export default fastifyPlugin(async (fastify, options) => {
  mongoose.connection.on('connect', () => {
    fastify.log.info(`MongoDB connected with user ${process.env.MONGO_USERNAME} on ${process.env.MONGO_DATABASE} database`)
  })
  mongoose.connection.on('disconnect', () => {
    fastify.log.info('MongoDB disconnected')
  })
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`)
  } catch(e) {
    fastify.log.error(`Mongo error: ${e}`)
  }
})