import { FastifyInstance } from 'fastify'
import { CreateUserController } from '../main/controllers/CreateUser'

export async function usersRoutes (simplify: FastifyInstance) {
  simplify.get('/', (request, reply) => {
    return reply.send({ message: 'Users routes' })
  })

  simplify.post('/', async (request, reply ) => new CreateUserController().execute(request, reply))
}
