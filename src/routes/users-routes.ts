import { FastifyInstance } from 'fastify'
import { CreateUserController } from '../main/controllers/create-user'
import { CreateUserUseCase } from '../main/use-cases/create-user'

export async function usersRoutes (simplify: FastifyInstance) {
  simplify.get('/', (request, reply) => {
    return reply.send({ message: 'Users routes' })
  })

  simplify.post('/', async (request, reply ) => {
    const createUserUseCase = new CreateUserUseCase()
    return new CreateUserController(createUserUseCase).execute(request, reply)
  })
}
