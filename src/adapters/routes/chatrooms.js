const express = require("express");
const path = require("path");
const { viewsPath } = require("../../application/config/environment");

const router = express.Router();
const sectionPath = "chatrooms";

router.get("/", (req, res) => {
  res.sendFile(path.join(viewsPath, sectionPath, "index.html"));
});

module.exports = router;
