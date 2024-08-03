import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { usersRoutes } from './routes/users-routes'
import { ZodError } from 'zod'
import { CustomError } from './main/errors/custom-error'
import cors from '@fastify/cors'

const app = fastify()

app.register(cors, {
  hook: 'preHandler',
  delegator: (request, callback) => {
    const corsOptions = {
      origin: true
    }
    callback(null, corsOptions)
  }
})

app.register(usersRoutes, {
  prefix: '/users'
})

app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  if (error instanceof ZodError) {
    return reply.status(422).send({
      message: error.format()
    })
  } else if (error instanceof CustomError) {
    return reply.status(422).send({
      message: error.message
    })
  }
  return reply.status(500).send()
})

export {
  app
}
