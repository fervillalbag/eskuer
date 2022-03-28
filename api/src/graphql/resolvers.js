const productController = require("../controllers/product");
const supermarketController = require("../controllers/supermarket");
const priceController = require("../controllers/price");
const subsidiaryController = require("../controllers/subsidiary");

const resolvers = {
  Query: {
    // Product
    getProducts: () => productController.getProducts(),
    getProduct: (_, { id }) => productController.getProduct(id),

    // Supermarket
    getSupermarkets: () => supermarketController.getSupermarkets(),
    getSupermarket: (_, { id }) =>
      supermarketController.getSupermarket(id),

    // Price
    getPrices: (_, { idProduct, idSuper }) =>
      priceController.getPrices(idProduct, idSuper),

    // Subsidiary
    getSubsidiaries: (_, { idSuper }) =>
      subsidiaryController.getSubsidiaries(idSuper),
    getSubsidiary: (_, { id }) =>
      subsidiaryController.getSubsidiary(id),
  },

  Mutation: {
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

    // Subsidiary
    createSubsidiary: (_, { input }) =>
      subsidiaryController.createSubsidiary(input),
    updateSubsidiary: (_, { input }) =>
      subsidiaryController.updateSubsidiary(input),
    deleteSubsidiary: (_, { id }) =>
      subsidiaryController.deleteSubsidiary(id),
  },
};

module.exports = resolvers;
