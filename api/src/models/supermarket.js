const { model, Schema } = require("mongoose");

const SupermarketSchema = new Schema(
  {
    slug: {
      type: String,
      required: [true, "Slug is required"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
    products: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Supermarket", SupermarketSchema);
