export default async (fastify, opts) => {
  fastify.get('/', async (request, reply) => {
    return 'this is an example'
  })
}