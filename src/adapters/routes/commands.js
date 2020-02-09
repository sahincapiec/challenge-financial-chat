const express = require("express");
const { create, login } = require("../../application/services/user");
const User = require("../dto/user");

const router = express.Router();

router.post("/createUser", (req, res) => {
  const userData = req.body;
  create(userData)
    .then(({ user, token }) => res.status(201).send(new User(user, token)))
    .catch(error =>
      res.status(400).send({
        error: error.message
      })
    );
});

router.post("/loginUSer", (req, res) => {
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
