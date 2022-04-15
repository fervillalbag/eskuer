const LikeProduct = require("../models/likeProduct");

const createLikeProduct = async (idUser, idProduct) => {
  const likeProductFound = await LikeProduct.findOne({
    idUser,
    idProduct,
  });

  if (likeProductFound) {
    return {
      message: "You already liked this product!",
      success: false,
    };
  }

  try {
    const likeProduct = new LikeProduct({
      idUser,
      idProduct,
    });
    await likeProduct.save();

    return {
      message: "Liked!",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Error!",
      success: false,
    };
  }
};

const deleteLikeProduct = async (id, idUser, idProduct) => {
  try {
    await LikeProduct.findOneAndDelete({
      _id: id,
    }).where({ idUser, idProduct });

    return {
      message: "Unliked!",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Error!",
      success: false,
    };
  }
};

const getLikeProducts = async () => {
  try {
    const likeProducts = await LikeProduct.find();
    if (!likeProducts) {
      return {
        message: "No like products found!",
        success: false,
      };
    }

    return likeProducts;
  } catch (error) {
    console.log(error);

    return {
      message: "Error!",
      success: false,
    };
  }
};

const getLikesProductsUser = async (idUser) => {
  try {
    const likeProducts = await LikeProduct.find({ idUser });
    if (!likeProducts) {
      return {
        message: "No like products found!",
        success: false,
      };
    }

    return likeProducts;
  } catch (error) {
    console.log(error);

    return {
      message: "Error!",
      success: false,
    };
  }
};

const getLikeProduct = async (input) => {
  try {
    if (input.idUser && input.idProduct) {
      const likeProduct = await LikeProduct.findOne({
        idUser: input.idUser,
        idProduct: input.idProduct,
      });

      if (!likeProduct) {
        return {
          message: "No like product found!",
          success: false,
        };
      }

      return {
        id: likeProduct._id,
        value: true,
      };
    }
  } catch (error) {
    console.log(error);

    return {
      message: "Error!",
      success: false,
    };
  }
};

module.exports = {
  createLikeProduct,
  deleteLikeProduct,
  getLikeProducts,
  getLikesProductsUser,
  getLikeProduct,
};
