const express = require("express");
const reCommentController = require("../controller/re_comment_controller");
const router = express.Router();

// 대댓글작성
router.post("/recomment/write", reCommentController.write);

// 내가 쓴 대댓글 수정
router.patch("/recomment/update", reCommentController.update);

// 내가 쓴 대댓글 삭제
router.delete("/recomment/delete", reCommentController.delete);

module.exports = router;
