import path from 'path'
import AutoLoad from 'fastify-autoload'
import { fileURLToPath } from 'url'
import fastifyFormBody from '@fastify/formbody'
import fastifyMongooseAPI from 'fastify-mongoose-api'
import fastifyCORS  from '@fastify/cors'
import mongoose from "mongoose"
import Page from "./models/pages.js"
import Note from "./models/notes.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async (fastify, opts) => {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
  fastify.register(fastifyCORS)
  fastify.register(fastifyFormBody)
  fastify.register(fastifyMongooseAPI, {
    models: mongoose.models,
    prefix: '/api/',
    setDefaults: true,
    methods: ['list', 'get', 'post', 'patch', 'put', 'delete']
  })
}
