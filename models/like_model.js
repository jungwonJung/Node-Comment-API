const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
});

module.exports = mongoose.model("Like", likeSchema);
