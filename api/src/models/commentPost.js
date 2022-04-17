const { model, Schema } = require("mongoose");

const commentPostController = new Schema(
  {
    idUser: {
      type: String,
      required: [true, "idUser is required"],
    },
    idPost: {
      type: String,
      required: [true, "idPost is required"],
    },
    branchOffice: {
      type: String,
      required: [true, "branchOffice is required"],
    },
    supermarket: {
      type: String,
      required: [true, "supermarket is required"],
    },
    address: {
      type: String,
    },
    reference: {
      type: String,
      required: [true, "reference is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("CommentPost", commentPostController);
