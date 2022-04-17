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

  type LikeProduct {
    id: String
    idUser: String
    idProduct: String
    createdAt: String
  }

  type LikePost {
    id: String
    idUser: String
    idPost: String
    createdAt: String
  }

  type IsLike {
    id: String
    value: Boolean
  }

  type Post {
    id: String
    title: String
    idUser: String
    image: String
    createdAt: String
    updatedAt: String
  }

  type CommentPost {
    id: String
    idUser: String
    idPost: String
    branchOffice: String
    supermarket: String
    reference: String
    address: String
    createdAt: String
    updatedAt: String
  }

  input CommentPostInput {
    id: String
    idUser: String
    idPost: String
    branchOffice: String
    address: String
    supermarket: String
    reference: String
  }

  input PostInput {
    id: String
    title: String
    idUser: String
    image: String
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

  input LikeProductInput {
    idUser: String
    idProduct: String
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
    getUsers: [User]

    # Product
    getProducts: [Product]
    getProduct(id: String): Product

    # Supermarket
    getSupermarkets: [Supermarket]
    getSupermarket(id: String!): Supermarket

    # Price
    getPrices(idProduct: String, idSuper: String): [Price]
    getPrice(idProduct: String, idSuper: String): Price

    # Like Product
    getLikeProducts: [LikeProduct]
    getLikesProductsUser(idUser: String): [LikeProduct]
    getLikeProduct(input: LikeProductInput): IsLike

    # Post
    getPosts: [Post]
    getPost(id: String): Post

    # Like Post
    getLikePosts: [LikePost]
    getLikesPostsUser(idUser: String): [LikePost]
    getLikePost(idUser: String, idPost: String): IsLike

    # Comment Post
    getCommentPosts: [CommentPost]
    getCommentPostsUser(idUser: String): [CommentPost]
    getCommentPostsOnPost(idPost: String): [CommentPost]
    getCommentPost(id: String): CommentPost
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

    # Like Product
    createLikeProduct(
      idUser: String
      idProduct: String
    ): MutationResponse
    deleteLikeProduct(
      id: String
      idUser: String
      idProduct: String
    ): MutationResponse

    # Post
    createPost(input: PostInput!): MutationResponse
    updatePost(input: PostInput!): MutationResponse
    deletePost(id: String!): MutationResponse

    # Like Post
    createLikePost(idUser: String, idPost: String): MutationResponse
    deleteLikePost(
      id: String
      idUser: String
      idPost: String
    ): MutationResponse

    # Comment Post
    createCommentPost(input: CommentPostInput!): MutationResponse
    updateCommentPost(input: CommentPostInput!): MutationResponse
    deleteCommentPost(id: String!): MutationResponse
  }
`;

module.exports = typeDefs;
