const express = require("express");
const commentController = require("../controller/comment_controller");
const router = express.Router();

// 댓글작성
router.post("/write", commentController.write);

// 내가 쓴 댓글 조회
router.get("/write/mylist", commentController.getMy);

// 댓글 전체 조회
router.get("/write/list", commentController.getAll);

// 내가 쓴 댓글 수정
router.patch("/write/update", commentController.update);

// 내가 쓴 댓글 삭제
router.delete("/write/delete", commentController.delete);

module.exports = router;
