import path from 'path'
import AutoLoad from 'fastify-autoload'
import { fileURLToPath } from 'url'
import fastifyFormBody from '@fastify/formbody'
import fastifyCORS from '@fastify/cors'
import ajvCompiler from '@fastify/ajv-compiler'
import Fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { config } from 'dotenv'

config()

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
  dir: path.join(__dirname, 'routes')
})
app.register(fastifyCookie)
app.register(fastifyCORS, { credentials: true, origin: process.env.CLIENT_URL })
app.register(fastifyFormBody)

try {
  await app.listen(process.env.API_PORT)
} catch(e) {
  console.log(e)
  process.exit()
}
