const { model, Schema } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    idSuper: {
      // type: Schema.Types.ObjectId,
      type: String,
      required: true,
      ref: "Supermarket",
    },
    price: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", ProductSchema);
