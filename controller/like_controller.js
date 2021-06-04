const User = require("../models/user_model");
const Comment = require("../models/comment_model");
const Like = require("../models/like_model");
const jwt = require("jsonwebtoken");
const path = require("path");
const { request } = require("http");
const { response } = require("express");
const { paginate } = require("mongoose-paginate-v2");
const ObjectId = require("mongoose").Types.ObjectId;

require("dotenv").config();

const MY_SECRET_KEY = process.env.SECRET_KEY;

exports.addLike = async (request, response) => {
  const { id } = request.body;
  const { token } = request.headers;
  const decoded_token = jwt.verify(token, MY_SECRET_KEY);

  if (decoded_token) {
    let user = await User.findOne({ _id: decoded_token.user });
    let userId = user._id;
    let comment = await Comment.findOne({ ObjectId: id });
    let parentComment = comment._id;
    let result = {};
    let isLiked = await Like.findOne({ $and: [{ user: userId }, { board: parentComment }] });

    if (isLiked) {
      await Like.findByIdAndDelete(isLiked);
      await Comment.updateMany(
        {
          ObjectId: id,
        },
        { $inc: { isLiked: -1 } }
      );
      result = { data: false };
      return response.send({ message: "좋아요 해제" });
    } else {
      await Like.create({
        user: userId,
        board: parentComment,
      });
      await Comment.updateMany(
        {
          ObjectId: id,
        },
        { $inc: { isLiked: 1 } }
      );
      result = { data: true };
      return response.send({ message: "좋아요 성공" });
    }
  }
};
