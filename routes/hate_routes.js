const express = require("express");
const hateController = require("../controller/hate_controller");
const router = express.Router();

// 싫어요 설정 및 해제
router.post("/hate", hateController.addHate);

module.exports = router;
