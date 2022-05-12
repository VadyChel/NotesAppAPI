import path from 'path'
import AutoLoad from 'fastify-autoload'
import { fileURLToPath } from 'url'
import fastifyFormBody from '@fastify/formbody'
import fastifyMongooseAPI from 'fastify-mongoose-api'
import fastifyCORS from '@fastify/cors'
import mongoose from 'mongoose'
import ajvCompiler from '@fastify/ajv-compiler'
import Fastify from 'fastify'
import { API_PORT } from './config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const validationFactory = ajvCompiler()
const app = Fastify({
  logger: {
    prettyPrint: {
      translateTime: true, colorize: true
    }, serializers: {
      req: (request) => ({
        method: request.method, url: request.url
      }), res: (response) => ({
        statusCode: response.statusCode
      })
    }
  }, schemaController: {
    compilesFactory: {
      buildValidator: validationFactory
    }
  }
})

app.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins')
})
app.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'), ignorePattern: /.+\.schemas\.js/
})
app.register(fastifyCORS)
app.register(fastifyFormBody)
app.register(fastifyMongooseAPI, {
  models: mongoose.models,
  prefix: '/api/',
  setDefaults: true,
  methods: ['list', 'get', 'post', 'patch', 'put', 'delete']
})

try {
  await app.listen(API_PORT)
} catch(e) {
  console.log(e)
  process.exit()
}
