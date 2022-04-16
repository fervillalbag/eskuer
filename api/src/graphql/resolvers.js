const productController = require("../controllers/product");
const supermarketController = require("../controllers/supermarket");
const priceController = require("../controllers/price");
const userController = require("../controllers/user");
const likeProduct = require("../controllers/likeProduct");
const postController = require("../controllers/post");
const likePostController = require("../controllers/likePost");

const resolvers = {
  Query: {
    // Product
    getUser: (_, { id }) => userController.getUser(id),
    getUsers: () => userController.getUsers(),

    // Product
    getProducts: () => productController.getProducts(),
    getProduct: (_, { id }) => productController.getProduct(id),

    // Supermarket
    getSupermarkets: () => supermarketController.getSupermarkets(),
    getSupermarket: (_, { id }) =>
      supermarketController.getSupermarket(id),

    // Price
    getPrice: (_, { idProduct, idSuper }) =>
      priceController.getPrice(idProduct, idSuper),
    getPrices: (_, { idProduct, idSuper }) =>
      priceController.getPrices(idProduct, idSuper),

    // Like Product
    getLikeProducts: () => likeProduct.getLikeProducts(),
    getLikesProductsUser: (_, { idUser }) =>
      likeProduct.getLikesProductsUser(idUser),
    getLikeProduct: (_, { input }) =>
      likeProduct.getLikeProduct(input),

    // Post
    getPosts: () => postController.getPosts(),
    getPost: (_, { id }) => postController.getPost(id),

    // Like Post
    getLikePosts: () => likePostController.getLikePosts(),
    getLikesPostsUser: (_, { idUser }) =>
      likePostController.getLikesPostsUser(idUser),
    getLikePost: (_, { idUser, idPost }) =>
      likePostController.getLikePost(idUser, idPost),
  },

  Mutation: {
    // User
    createUser: (_, { input }) => userController.createUser(input),
    login: (_, { input }) => userController.login(input),
    updateUser: (_, { input }) => userController.updateUser(input),
    deleteUser: (_, { id }) => userController.deleteUser(id),

    // Product
    createProduct: (_, { input }) =>
      productController.createProduct(input),
    updateProduct: (_, { input }) =>
      productController.updateProduct(input),
    deleteProduct: (_, { id }) => productController.deleteProduct(id),

    // Supermarket
    createSupermarket: (_, { input }) =>
      supermarketController.createSupermarket(input),
    updateSupermarket: (_, { input }) =>
      supermarketController.updateSupermarket(input),
    deleteSupermarket: (_, { id }) =>
      supermarketController.deleteSupermarket(id),

    // Price
    createPrice: (_, { input }) => priceController.createPrice(input),
    updatePrice: (_, { input }) => priceController.updatePrice(input),
    deletePrice: (_, { id }) => priceController.deletePrice(id),

    // Like Product
    createLikeProduct: (_, { idUser, idProduct }) =>
      likeProduct.createLikeProduct(idUser, idProduct),
    deleteLikeProduct: (_, { id, idUser, idProduct }) =>
      likeProduct.deleteLikeProduct(id, idUser, idProduct),

    // Post
    createPost: (_, { input }) => postController.createPost(input),
    updatePost: (_, { input }) => postController.updatePost(input),
    deletePost: (_, { id }) => postController.deletePost(id),

    // Like Post
    createLikePost: (_, { idUser, idPost }) =>
      likePostController.createLikePost(idUser, idPost),
    deleteLikePost: (_, { id, idUser, idPost }) =>
      likePostController.deleteLikePost(id, idUser, idPost),
  },
};

module.exports = resolvers;
