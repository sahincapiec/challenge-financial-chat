const express = require("express");
const { createUser } = require("../../application/services/user");

const router = express.Router();

router.post("/createUser", (req, res) => {
  const userData = req.body;
  createUser(userData)
    .then(user => res.status(201).send(user))
    .catch(error =>
      res.status(400).send({
        error
      })
    );
});

router.post("*", (req, res) => {
  res.status(404).send({
    error: "Commmand not found"
  });
});

module.exports = router;
