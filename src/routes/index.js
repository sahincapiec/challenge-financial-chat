const express = require("express");
const path = require("path");

const router = express.Router();

const viewsPath = path.join(__dirname, "../views");

router.get("*", (req, res) => {
  res.sendFile(path.join(viewsPath, "/404.html"));
});

module.exports = router;
