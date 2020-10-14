const { gql } = require('apollo-server-express');
// console.log("print gql",+gql);
const typeDefs = gql`

type User {
    id: ID
    name: String
    email: String
  }

  type Query {
    users: [User]
    user(id: ID): User
  }

  type Mutation {
    createUser(name: String, email: String): User
    updateUser(name: String, email: String,id: ID): User
    deleteUser(id: ID): User
  }
`;

module.exports = typeDefs
