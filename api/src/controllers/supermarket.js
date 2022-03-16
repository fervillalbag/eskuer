const Supermarket = require("../models/supermarket");

const getSupermarkets = async () => {
  try {
    const supermarkets = await Supermarket.find({});
    if (!supermarkets) throw new Error("Supermarkets not found!");
    return supermarkets;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createSupermarket = async (input) => {
  try {
    const supermarket = new Supermarket(input);
    await supermarket.save();
    if (!supermarket) throw new Error("Supermarket not found!");

    return {
      message: "Supermarket created!",
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

const updateSupermarket = async (input) => {
  try {
    await Supermarket.findOneAndUpdate({ _id: input.id }, input);

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

const deleteSupermarket = async (id) => {
  try {
    await Supermarket.findOneAndDelete({ _id: id });

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
  createSupermarket,
  updateSupermarket,
  deleteSupermarket,
  getSupermarkets,
};
