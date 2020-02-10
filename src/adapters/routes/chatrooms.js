const express = require("express");
const PublishMessageForm = require("../dto/publishMessageForm");
const { authByCookies } = require("../../application/services/user");
const cookieParser = require("../../application/services/cookie");

const router = express.Router();

router.get("/*", cookieParser);
router.get("/*", authByCookies);

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

router.post(
  "/:roomId/publishMessage",
  express.text({
    type: "application/x-www-form-urlencoded"
  }),
  (req, res) => {
    const roomId = req.pathParams.roomId;
    if (!roomId) {
      res.render("chatrooms");
    }
    const publishMessageForm = new PublishMessageForm(req.body);
    res.render("room", {
      roomId
    });
  }
);

module.exports = router;
