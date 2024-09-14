import { gql } from 'apollo-server'

export const userSchema = gql`
  type Query {
    user: String!
  }
`
