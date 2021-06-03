const express = require("express");
const app = express();
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const http = require("http");
const https = require("https");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config({ path: "./settings.env" });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use("/api", require("./routes/user_routes"));
app.use("/api", require("./routes/comment_routes"));
app.use("/api", require("./routes/re_comment_routes"));

app.listen(3000, function (err) {
  console.log("서버 구동중");
});

const options = {
  // swagger ui 세팅
  definition: {
    swagger: "2.0",
    info: {
      title: "댓글 과제 API 문서",
      version: "1.0",
    },
  },
  apis: ["./swagger_setting/index.js"],
  schemas: ["http", "https"],
};

const specs = swaggerJsdoc(options);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

const uri = process.env.MONGODB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function (err) {
  // process.env.MONGODB_URL 만든 .env 파일안에 MONGODB_URL 전달
  if (err) {
    console.log(err);
  } else {
    console.log("연결성공");
  }
});

module.exports = app;
