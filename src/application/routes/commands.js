const express = require("express");
const { create, login } = require("../services/user");
const User = require("../../adapters/dto/user");

const router = express.Router();
const jsonMiddleware = express.json();

router.post("/createUser", jsonMiddleware, async (req, res) => {
  const userData = req.body;
  try {
    const { user, token } = await create(userData);
    res.status(201).send(new User(user, token));
  } catch (error) {
    res.status(400).send({
      error: error.message
    });
  }
});

router.post("/loginUSer", jsonMiddleware, (req, res) => {
  const userData = req.body;
  login(userData)
    .then(({ user, token }) => res.status(200).send(new User(user, token)))
    .catch(error =>
      res.status(400).send({
        error: error.message
      })
    );
});

router.post("*", (req, res) => {
  res.status(404).send({ error: "Command not found" });
});

module.exports = router;
