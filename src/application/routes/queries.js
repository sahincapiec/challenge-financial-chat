const express = require("express");
const { authByCookies } = require("../services/user");
const cookieParser = require("../services/cookie");
const { loadMessages } = require("../services/message");

const router = express.Router();

router.get("/*", cookieParser);
router.get("/*", authByCookies);

router.param("roomId", function(req, res, next, roomId) {
  req.pathParams = { ...req.pathParams, roomId };
  next();
});

router.get("/getMessages/:roomId", async (req, res) => {
  const roomId = req.pathParams.roomId;
  if (!roomId) {
    res.status(400).send({ error: "roomId is required" });
  }
  try {
    const messages = await loadMessages(roomId);
    res.status(200).send(messages);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
