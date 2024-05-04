import { FastifyReply, FastifyRequest } from "fastify";
import { Controller } from "../interfaces/controller";

export class CreateUserController implements Controller {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    return reply.status(201).send()
  }
}
