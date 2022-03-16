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

  type Supermarket {
    id: String
    slug: String
    name: String
    image: String
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

  input SupermarketInput {
    slug: String
    name: String
    image: String
  }

  input SupermarketUpdateInput {
    id: String
    slug: String
    name: String
    image: String
  }

  type Query {
    # Product
    getProducts: [Product]
    getProduct(id: String!): Product

    # Supermarket
    getSupermarkets: [Supermarket]
  }

  type Mutation {
    # Product
    createProduct(input: ProductInput!): MutationResponse
    updateProduct(input: ProductUpdateInput!): MutationResponse
    deleteProduct(id: String!): MutationResponse

    # Supermarket
    createSupermarket(input: SupermarketInput!): MutationResponse
    updateSupermarket(
      input: SupermarketUpdateInput!
    ): MutationResponse
    deleteSupermarket(id: String!): MutationResponse
  }
`;

module.exports = typeDefs;
