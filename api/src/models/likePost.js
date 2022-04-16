const { model, Schema } = require("mongoose");

const likePostSchema = new Schema({
  idUser: {
    type: String,
    required: [true, "idUser is required"],
  },
  idPost: {
    type: String,
    required: [true, "idPost is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("LikePost", likePostSchema);
