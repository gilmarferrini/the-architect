import { FastifyInstance } from 'fastify'

export async function usersRoutes (simplify: FastifyInstance) {
  simplify.get('/', (request, reply) => {
    return reply.send({ message: 'Users routes' })
  })
}
