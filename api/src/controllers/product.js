const Product = require("../models/product");

const getProducts = async () => {
  try {
    const products = await Product.find({});
    if (!products) throw new Error("Products not found!");
    return products;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createProduct = async (input) => {
  try {
    const product = new Product(input);
    await product.save();
    if (!product) throw new Error("Product not found!");

    return {
      message: "product created!",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Some error",
      success: false,
    };
  }
};

const updateProduct = async (input) => {
  try {
    await Product.findOneAndUpdate({ _id: input.id }, input);

    return {
      message: "Supermarket updated!",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Some error",
      success: false,
    };
  }
};

const deleteProduct = async (id) => {
  try {
    await Product.findOneAndDelete({ _id: id });

    return {
      message: "Supermarket deleted!",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Some error",
      success: false,
    };
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};
