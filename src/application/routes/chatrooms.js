const express = require("express");
const PublishMessageForm = require("../../adapters/dto/publishMessageForm");
const { authByCookies } = require("../services/user");
const cookieParser = require("../services/cookie");
const { create, loadMessages } = require("../services/message");

const router = express.Router();

router.get("/*", cookieParser);
router.get("/*", authByCookies);

router.post("/*", cookieParser);
router.post("/*", authByCookies);

router.param("roomId", function(req, res, next, roomId) {
  req.pathParams = { ...req.pathParams, roomId };
  next();
});

router.get("/", (req, res) => {
  res.render("chatrooms");
});

router.get("/:roomId", async (req, res) => {
  const roomId = req.pathParams.roomId;
  if (!roomId) {
    res.render("chatrooms");
  }
  const messages = await loadMessages(roomId);
  res.render("room", {
    roomId,
    messages
  });
});

router.post(
  "/:roomId/publishMessage",
  express.text({
    type: "application/x-www-form-urlencoded"
  }),
  async (req, res) => {
    const roomId = req.pathParams.roomId;
    if (!roomId) {
      res.render("chatrooms");
    }
    const publishMessageForm = new PublishMessageForm(req.body);
    await create(publishMessageForm.message, req.user, roomId);
    const messages = await loadMessages(roomId);
    res.render("room", {
      roomId,
      messages
    });
  }
);

module.exports = router;
