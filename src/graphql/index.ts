import { usersQueries } from './users/queries'
import { userSchema } from './users/schemas'

export const rootTypedefs = [
  userSchema
]

export const rootResolvers = {
  Query: {
    ...usersQueries
  }
}
