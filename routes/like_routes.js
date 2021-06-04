const express = require("express");
const likeController = require("../controller/like_controller");
const router = express.Router();

// 좋아요 설정 및 해제
router.post("/like", likeController.addLike);

module.exports = router;
