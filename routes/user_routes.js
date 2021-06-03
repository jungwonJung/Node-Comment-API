const express = require("express");
const userController = require("../controller/user_controller");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// 회원가입
router.post(
  "/create/account",
  [
    check("accountEmail").isEmail().withMessage("잘못된 이메일 주소입니다"),

    check("accountPw")
      .isLength({ min: 6, max: 15 })
      .isAlphanumeric()
      .withMessage("비밀번호는 최소 6자에서 최대 15자로 설정해주세요"),
  ],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
      res.send("3333"); // message : 잘못된 이메일 주소이거나 , 비밀번호는 최소 6자에서 최대 15자, 특수문자가 1개이상이 포함되어야 합니다
    } else {
      next();
    }
  },
  userController.create
);

// 로그인
router.post("/login", userController.login);

module.exports = router;
