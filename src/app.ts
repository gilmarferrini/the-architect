import fastify from 'fastify'
import { usersRoutes } from './core/routes/usersRoutes'

const app = fastify()

app.register(usersRoutes, {
  prefix: '/users'
})

export {
  app
}
