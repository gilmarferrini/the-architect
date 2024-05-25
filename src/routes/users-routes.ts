import { FastifyInstance } from 'fastify'
import { CreateUserController } from '../main/controllers/create-user'
import { CreateUserUseCaseFactory } from '../main/factories/create-user-use-case-factory'

export async function usersRoutes (simplify: FastifyInstance) {
  simplify.get('/', (request, reply) => {
    return reply.send({ message: 'Users routes' })
  })

  simplify.post('/', async (request, reply ) => {
    const createUserUseCase = CreateUserUseCaseFactory.create()
    return new CreateUserController(createUserUseCase).execute(request, reply)
  })
}
