const mongoose = require("mongoose");

const hateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
});

//싫어요 할 때 Board에 좋아요 유저 추가하기
hateSchema.post("save", async function (next) {
  const self = this;
  const ref_board = await mongoose.model("Comment").findById(self.board);
  await ref_board.updateOne({ $push: { likes: this.user } }).exec();
});

//싫어요 풀 때 Board에 좋아요 유저 빼기
hateSchema.pre(/Delete$/, async function (next, doc) {
  self = this._conditions._id;
  const ref_board = await mongoose.model("Comment").findById(self.board);
  await ref_board.updateOne({ $pull: { likes: self.user } }).exec();
});

module.exports = mongoose.model("Hate", hateSchema);
