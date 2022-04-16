const { model, Schema } = require("mongoose");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      default: "¿Dónde puedo conseguir este producto?",
    },
    idUser: {
      type: String,
      required: [true, "User is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", PostSchema);
