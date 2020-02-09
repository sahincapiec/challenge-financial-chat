const express = require("express");
const path = require("path");
const { viewsPath } = require("../../application/config/environment");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(viewsPath, "/index.html"));
});

router.get("*", (req, res) => {
  res.sendFile(path.join(viewsPath, "/404.html"));
});

router.post("*", (req, res) => {
  res.status(404).send({
    error: "Not found"
  });
});

module.exports = router;
