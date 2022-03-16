const { gql } = require("apollo-server");

const typeDefs = gql`
  type MutationResponse {
    message: String
    success: String
  }

  type Price {
    value: Float
    type: String
    createdAt: String
  }

  type Product {
    id: String
    name: String
    idSuper: String
    price: [Price]
  }

  input PriceInput {
    value: Float
    type: String
    createdAt: String
  }

  input ProductInput {
    name: String
    idSuper: String
    price: [PriceInput]
  }

  input ProductUpdateInput {
    id: String
    name: String
    idSuper: String
    price: [PriceInput]
  }

  type Query {
    getProducts: [Product]
    getProduct(id: String!): Product
  }

  type Mutation {
    # Product
    createProduct(input: ProductInput!): MutationResponse
    updateProduct(input: ProductUpdateInput!): MutationResponse
    deleteProduct(id: String!): MutationResponse
  }
`;

module.exports = typeDefs;
