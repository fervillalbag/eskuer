const LikePost = require("../models/likePost");

const getLikePosts = async () => {
  try {
    const likePosts = await LikePost.find();

    if (!likePosts) {
      throw new Error("No likePosts found");
    }

    return likePosts;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getLikesPostsUser = async (idUser) => {
  try {
    const likePosts = await LikePost.find({ idUser });
    if (!likePosts) {
      throw new Error("No likePosts found");
    }

    return likePosts;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getLikePost = async (idUser, idPost) => {
  try {
    const likePost = await LikePost.findOne({ idUser, idPost });
    if (!likePost) {
      throw new Error("No likePost found");
    }

    return {
      id: likePost._id,
      value: true,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createLikePost = async (idUser, idPost) => {
  try {
    const likePostFound = await LikePost.findOne({ idPost });

    if (likePostFound) {
      return {
        message: "You already liked this post!",
        success: false,
      };
    }

    const likePost = new LikePost({
      idUser,
      idPost,
    });
    await likePost.save();

    return {
      message: "Liked!",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Error!",
      success: false,
    };
  }
};

const deleteLikePost = async (id, idUser, idPost) => {
  try {
    await LikePost.findOneAndDelete({
      _id: id,
      idUser,
      idPost,
    });

    return {
      message: "Unliked!",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Error!",
      success: false,
    };
  }
};

module.exports = {
  createLikePost,
  deleteLikePost,
  getLikePosts,
  getLikesPostsUser,
  getLikePost,
};
