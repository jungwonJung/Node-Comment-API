const express = require("express");
const commentController = require("../controller/comment_controller");
const { check, validationResult, checkSchema } = require("express-validator");
const router = express.Router();

let Schema = {
  text: {
    in: "body",
    matches: {
      options: [/바보|말미잘|해삼|멍청이/],
      errorMessage: "금지어가 포함됬습니다",
    },
  },
};

// 댓글작성
router.post(
  "/write",
  [checkSchema(Schema)],
  function (req, res, next) {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (!hasError) {
      res.send("금지어가 포함됬습니다 ");
    } else {
      next();
    }
  },
  commentController.write
);

// 대댓글작성
router.post(
  "/write/recomment",
  [checkSchema(Schema)],
  function (req, res, next) {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (!hasError) {
      res.send("금지어가 포함됬습니다 ");
    } else {
      next();
    }
  },
  commentController.reCommentWrite
);

// 내가 쓴 댓글 조회
router.get("/write/mylist", commentController.getMy);

// 댓글 전체 조회
router.get("/write/list", commentController.getAll);

// 내가 쓴 댓글 수정
router.patch("/write/update", commentController.update);

// 내가 쓴 댓글 삭제
router.delete("/write/delete", commentController.delete);

module.exports = router;
