const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  reComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  text: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isLiked: {
    type: Number,
    default: 0,
  },
  isHated: {
    type: Number,
    default: 0,
  },
  created: {
    type: Number,
  },
  updated: {
    type: Number,
  },
});

commentSchema.plugin(mongoosePaginate);

mongoose.model("Comment", commentSchema);
module.exports = mongoose.model("Comment", commentSchema);
