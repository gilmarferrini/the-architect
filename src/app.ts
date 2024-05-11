import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { usersRoutes } from './routes/users-routes'
import { ZodError } from 'zod'

const app = fastify()

app.register(usersRoutes, {
  prefix: '/users'
})

app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  if (error instanceof ZodError) {
    return reply.status(422).send({
      message: error.format()
    })
  }
})

export {
  app
}
