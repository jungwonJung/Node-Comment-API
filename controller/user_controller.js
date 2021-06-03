const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { send } = require("process");
require("dotenv").config();

const MY_SECRET_KEY = process.env.SECRET_KEY;

// 회원가입
exports.create = async (request, response, next) => {
  const { accountEmail, accountPw, accountName } = request.body;

  const user = new User();

  user.accountEmail = accountEmail;
  user.accountPw = accountPw;
  user.accountName = accountName;
  user.created = Date.now();
  user.updated = Date.now();

  if (!accountEmail || !accountPw || !accountName) return response.send("1234");
  // 1234 error message: "모든 항목입력주세요"

  User.findOne({ accountEmail: accountEmail }, function (err, results, next) {
    if (results) {
      return response.send("3588"); // error 3588 중복되는 이메일일 경우
    } else {
      user.save(function (err) {
        if (err) {
          throw err;
        } else {
          response.send(Array(user));
        }
      });
    }
  });
};

// 로그인
exports.login = async (request, response) => {
  const { accountEmail, accountPw } = request.body;
  const user = await User.findOne({ accountEmail: accountEmail });

  if (user) {
    const comparePassword = await bcrypt.compare(accountPw, user.accountPw);
    if (comparePassword) {
      const token = jwt.sign({ user: user._id }, MY_SECRET_KEY, {
        subject: "CIZION jwtoken",
        expiresIn: "1440m",
      });
      response.status(200).json({
        token,
        accountEmail: accountEmail,
        accountName: user.accountName,
        accountId: user._id,
      });
    } else {
      response.send("9999");
      // 9999 error  message:"비밀번호가 다릅니다"
    }
  } else {
    response.send("8888");
    // 8888 error message:"이메일이 다르거나 이메일 인증이 되지않았습니다"
  }
};
