const { model, Schema } = require("mongoose");

const likeProductSchema = new Schema({
  idUser: {
    type: String,
    required: [true, "idUser is required"],
  },
  idProduct: {
    type: String,
    required: [true, "idProduct is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("LikeProduct", likeProductSchema);
