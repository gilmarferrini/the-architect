import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"
import { Controller } from "../interfaces/controller";
import { CreateUser } from "../interfaces/create-user";
import { db } from "../../core/knex";

export class CreateUserController implements Controller {

  constructor (private readonly createUserUseCase: CreateUser) {}

  async execute(request: FastifyRequest, reply: FastifyReply) {
    const createUserSchema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      password: z.string().min(6),
      email: z.string().email(),
    })
    const { firstName, lastName, password, email } = createUserSchema.parse(request.body)
    // temp - FIX ME
    const [createdAccount] = await db('accounts').insert({
      name: `${firstName} ${lastName}`,
    }).returning('*')
    await this.createUserUseCase.perform({
      firstName,
      lastName,
      password,
      email,
      accountId: createdAccount.id
    })

    return reply.status(201).send()
  }
}
