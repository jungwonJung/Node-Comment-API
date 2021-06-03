const User = require("../models/user_model");
const Comment = require("../models/comment_model");
const jwt = require("jsonwebtoken");
const path = require("path");
const { request } = require("http");
const { response } = require("express");
const { paginate } = require("mongoose-paginate-v2");
const ObjectId = require("mongoose").Types.ObjectId;

require("dotenv").config();

const MY_SECRET_KEY = process.env.SECRET_KEY;

// 댓글 작성
exports.write = async (request, response) => {
  const { text } = request.body;
  const { token } = request.headers;
  const decoded_token = jwt.verify(token, MY_SECRET_KEY);

  if (!text) return response.send("내용을 작성해주세요");

  if (decoded_token) {
    let user = await User.findOne({ _id: decoded_token.user });
    let userId = user._id;
    let saveData = await { userId, text };
    let commentInfo = await new Comment(saveData);

    commentInfo.created = Date.now();
    commentInfo.save();

    return response.send({
      result: "댓글이 작성되었습니다",
      commentInfo,
    });
  }
};

// 대댓글 작성
exports.reCommentWrite = async (request, response) => {
  const { text, id } = request.body;
  const { token } = request.headers;
  const decoded_token = jwt.verify(token, MY_SECRET_KEY);

  if (!text) return response.send("내용을 작성해주세요");

  if (decoded_token) {
    let user = await User.findOne({ _id: decoded_token.user });
    let userId = user._id;
    let comment = await Comment.findOne({ ObjectId: id });
    let parentComment = comment._id;
    let saveData = await { userId, parentComment, text };
    let reCommentInfo = await new Comment(saveData);

    reCommentInfo.created = Date.now();
    reCommentInfo.save();

    let reCommentInfoId = reCommentInfo._id;
    let updateComment = await Comment.updateOne(
      {
        ObjectId: id,
      },
      { $set: { reComment: reCommentInfoId } }
    );
    return response.send({
      updateComment,
      result: "대댓글이 작성되었습니다",
      reCommentInfo,
    });
  }
};

// 내가쓴 댓글 조회
exports.getMy = async (request, response) => {
  const { next, previous } = request.query;
  const { sort } = request.query;
  const { token } = request.headers;
  const decoded_token = jwt.verify(token, MY_SECRET_KEY);

  const popul = { path: "userId", select: "accountName created updated" };

  const myCustomLabels = {
    totalDocs: false,
    docs: "result",
    limit: false,
    page: false,
    nextPage: "next",
    prevPage: "previous",
    hasNextPage: "hasNext",
    hasPrevPage: "hasPrevious",
    pagingCounter: false,
    totalPages: false,
    meta: "paginator",
  };

  const options = {
    page: parseInt(next, 10) || 1,
    limit: 5,
    customLabels: myCustomLabels,
    sort: { created: sort },
    populate: popul,
    nextPage: 0,
  };

  if (decoded_token) {
    let myComment = await Comment.find({ userId: decoded_token.user });
    let commentId = myComment.map((s) => s.userId);
    let docs = await Comment.paginate({ userId: { $in: commentId } }, options, next, previous);
    let result = await docs.result;
    let paginator = await docs.paginator;
    let list = { result, paginator };
    return response.send(list);
  }
};

// 댓글 전체조회
exports.getAll = async (request, response) => {
  const { next, previous } = request.query;
  const { sort } = request.query;

  const popul = {
    path: "userId reComment",
    select: "accountName created updated text userId",
    populate: {
      path: "userId",
      select: "accountName created updated",
    },
  };

  const myCustomLabels = {
    totalDocs: false,
    docs: "result",
    limit: false,
    page: false,
    nextPage: "next",
    prevPage: "previous",
    hasNextPage: "hasNext",
    hasPrevPage: "hasPrevious",
    pagingCounter: false,
    totalPages: false,
    meta: "paginator",
  };

  const options = {
    page: parseInt(next, 10) || 1,
    limit: 5,
    customLabels: myCustomLabels,
    sort: { created: sort },
    populate: popul,
    nextPage: 0,
  };

  let docs = await Comment.paginate({}, options, next, previous);
  let totalCount = await Comment.countDocuments();
  let result = await docs.result;
  let paginator = await docs.paginator;
  let list = { totalCount, result, paginator };
  return response.send(list);
};

//댓글 수정
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

// 댓글 삭제
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
