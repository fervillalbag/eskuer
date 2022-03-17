const { model, Schema } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    supermarket: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", ProductSchema);
