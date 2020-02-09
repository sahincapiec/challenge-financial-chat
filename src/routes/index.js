const express = require("express");
const path = require("path");
const { viewsPath } = require("../config/environment");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(viewsPath, "/index.html"));
});

router.get("*", (req, res) => {
  res.sendFile(path.join(viewsPath, "/404.html"));
});

module.exports = router;