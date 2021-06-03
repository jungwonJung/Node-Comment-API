const User = require("../models/user_model");
const Comment = require("../models/comment_model");
const reComment = require("../models/re_comment_model");
const jwt = require("jsonwebtoken");
const path = require("path");
const { request } = require("http");
const { response } = require("express");
const ObjectId = require("mongoose").Types.ObjectId;

require("dotenv").config();

const MY_SECRET_KEY = process.env.SECRET_KEY;

exports.write = async (request, response) => {
  const { text } = request.body;
  const { token } = request.headers;
  const decoded_token = jwt.verify(token, MY_SECRET_KEY);

  if (!text) return response.send("내용을 작성해주세요");

  if (decoded_token) {
    let user = await User.findOne({ _id: decoded_token.user });
    let userId = user._id;
    let saveData = await { userId, text };
    let textInfo = await new Comment(saveData);

    textInfo.created = Date.now();
    textInfo.save();

    return response.send({
      result: "댓글이 작성되었습니다",
      textInfo,
    });
  }
};

exports.update = async (request, response) => {
  const { token } = request.headers;
  const { id, text } = request.body;
  const decoded_token = jwt.verify(token, MY_SECRET_KEY);

  if (decoded_token) {
    let myComment = await User.find({ _id: decoded_token.user });
    let result = await Comment.updateOne(
      {
        ObjectId: id,
        userId: myComment,
      },
      { $set: { text: text, updated: Date.now() } }
    );
    if (result.ok) {
      return response.status(200).json({ message: "수정성공" });
    } else {
      return response.status(500).json({ message: "수정실패" });
    }
  }
};

exports.delete = async (request, response) => {
  const { token } = request.headers;
  const { id } = request.body;
  const decoded_token = jwt.verify(token, MY_SECRET_KEY);

  if (decoded_token) {
    let myComment = await User.find({ _id: decoded_token.user });
    let result = await Comment.updateOne(
      {
        ObjectId: id,
        userId: myComment,
      },
      { $set: { isDeleted: true } }
    );
    if (result.ok) {
      return response.status(200).json({ message: "삭제성공" });
    } else {
      return response.status(500).json({ message: "삭제실패" });
    }
  }
  // 삭제에서도 updateOne 을 쓴이유는 soft delete 처럼
  // 실제로 데이터를 삭제하지않고 list 를 get 하는 과정에서 필터링을 할수있게 코드작성
  // 데이터는 소중하다고 생각합니다  댓글로인한 법적문제도 요즘 많기때문에 보관해야할 필요를 느낌
};
