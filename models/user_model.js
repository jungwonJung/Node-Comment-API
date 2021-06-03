const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const userSchema = new mongoose.Schema({
  accountEmail: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  accountPw: {
    type: String,
    required: true,
  },
  created: {
    type: Number,
  },
  updated: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("accountPw")) {
    // user 내의 accountPw 와 대조
    return next();
  } else {
    user.accountPw = bcrypt.hashSync(user.accountPw);
    return next();
  }
});

mongoose.model("User", userSchema);
module.exports = mongoose.model("User");
