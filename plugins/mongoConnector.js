import fastifyPlugin from 'fastify-plugin'
import {MONGO_CLUSTER, MONGO_DATABASE, MONGO_PASSWORD, MONGO_USERNAME} from "../config.js";
import mongoose from "mongoose";

export default fastifyPlugin(async (fastify, options) => {
  mongoose.connect(
    `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DATABASE}?retryWrites=true&w=majority`
  )
    .then(
      () => fastify.log.info(`MongoDB connected with user ${MONGO_USERNAME} on ${MONGO_DATABASE} database`)
    )
    .catch(e => console.log(e))
})