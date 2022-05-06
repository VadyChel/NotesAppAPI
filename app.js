import path from 'path'
import AutoLoad from 'fastify-autoload'
import { fileURLToPath } from 'url'
import fastifyFormBody from '@fastify/formbody'
import fastifyMongooseAPI from 'fastify-mongoose-api'
import fastifyCORS  from '@fastify/cors'
import mongoose from "mongoose"
import ajvCompiler from '@fastify/ajv-compiler'
import fastify from "fastify"
import Page from "./models/pages.js"
import Note from "./models/notes.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const validationFactory = ajvCompiler()
const app = fastify({
  logger: {
    prettyPrint: {
      translateTime: true,
      colorize: true
    },
    serializers: {
      req: (request) => ({
        method: request.method,
        url: request.url
      }),
      res: (response) => ({
        statusCode: response.statusCode
      })
    }
  },
  schemaController: {
    compilesFactory: {
      buildValidator: validationFactory
    }
  }
})

app.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
})
app.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  ignorePattern: /.+\.schemas\.js/
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
  await app.listen(5000)
} catch (e) {
  console.log(e)
  process.exit()
}
