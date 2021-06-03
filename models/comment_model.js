const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "reComment",
  },
  text: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
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
