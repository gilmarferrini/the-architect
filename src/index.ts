import { ApolloServer } from 'apollo-server'
import { rootResolvers, rootTypedefs } from './graphql'

const server = new ApolloServer({
  typeDefs: rootTypedefs,
  resolvers: rootResolvers
})

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000')
})
