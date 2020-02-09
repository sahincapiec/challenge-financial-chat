const express = require("express");

const router = express.Router();

router.param("roomId", function(req, res, next, roomId) {
  req.pathParams = { ...req.pathParams, roomId };
  next();
});

router.get("/", (req, res) => {
  res.render("chatrooms");
});

router.get("/:roomId", (req, res) => {
  const roomId = req.pathParams.roomId;
  if (!roomId) {
    res.render("chatrooms");
  }
  res.render("room", {
    roomId
  });
});

router.get("/chatrooms/:roomId/publishMessage", (req, res) => {
  const roomId = req.pathParams.roomId;
  if (!roomId) {
    res.render("chatrooms");
  }
  res.render("room", {
    roomId
  });
});

module.exports = router;
