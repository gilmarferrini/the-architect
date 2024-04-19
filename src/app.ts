import fastify from 'fastify'

const app = fastify()

app.get('/users', (request, reply) => {
  return reply.send({ message: 'Users!!' })
})

export {
  app
}
