const { gql } = require("apollo-server");

const typeDefs = gql`
  type MutationResponse {
    message: String
    success: String
  }

  type User {
    id: String
    name: String
    email: String
    username: String
    avatar: String
    createdAt: String
    role: String
  }

  type Token {
    token: String
  }

  type Price {
    id: String
    idProduct: String
    idSuper: String
    idSubsidiary: String
    value: Float
    createdAt: String
  }

  type Product {
    id: String
    name: String
    category: String
    image: String
    type: String
    createdAt: String
  }

  type Supermarket {
    id: String
    name: String
    slug: String
    image: String
    city: String
    address: String
    title: String
    createdAt: String
  }

  input UserInput {
    id: String
    name: String
    email: String
    username: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  input ProductInput {
    id: String
    name: String
    category: String
    type: String
    image: String
  }

  input SupermarketInput {
    id: String
    name: String
    slug: String
    image: String
    city: String
    address: String
    title: String
  }

  input PriceInput {
    id: String
    idProduct: String
    idSuper: String
    value: Float
    createdAt: String
  }

  type Query {
    # User
    getUser(id: String): User

    # Product
    getProducts: [Product]
    getProduct(id: String): Product

    # Supermarket
    getSupermarkets: [Supermarket]
    getSupermarket(id: String!): Supermarket

    # Price
    # getPrices(idProduct: String, idSuper: String): [Price]
    getPrice(idProduct: String, idSuper: String): Price
  }

  type Mutation {
    # User
    createUser(input: UserInput!): MutationResponse
    login(input: LoginInput!): Token
    updateUser(input: UserInput!): MutationResponse
    deleteUser(id: String!): MutationResponse

    # Product
    createProduct(input: ProductInput!): MutationResponse
    updateProduct(input: ProductInput!): MutationResponse
    deleteProduct(id: String!): MutationResponse

    # Supermarket
    createSupermarket(input: SupermarketInput!): MutationResponse
    updateSupermarket(input: SupermarketInput!): MutationResponse
    deleteSupermarket(id: String!): MutationResponse

    # Price
    createPrice(input: PriceInput!): MutationResponse
    updatePrice(input: PriceInput!): MutationResponse
    deletePrice(id: String!): MutationResponse
  }
`;

module.exports = typeDefs;
