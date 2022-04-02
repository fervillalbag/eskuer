const { model, Schema } = require("mongoose");

const SupermarketSchema = new Schema({
  slug: {
    type: String,
    required: [true, "Slug is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("Supermarket", SupermarketSchema);
