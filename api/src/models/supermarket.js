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
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("Supermarket", SupermarketSchema);