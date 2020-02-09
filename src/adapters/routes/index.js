const express = require("express");
const path = require("path");
const { viewsPath } = require("../../application/config/environment");
const LoginForm = require("../dto/loginForm");
const { login } = require("../../application/services/user");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(viewsPath, "index.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(viewsPath, "login.html"));
});

router.post(
  "/login",
  express.text({
    type: "application/x-www-form-urlencoded"
  }),
  async (req, res) => {
    try {
      const userData = new LoginForm(req.body);
      const { user, token } = await login(userData);
      res.status(200).redirect("/chatrooms");
    } catch (error) {
      res.status(400).redirect("/login");
    }
  }
);

router.get("/signin", (req, res) => {
  res.sendFile(path.join(viewsPath, "signin.html"));
});

router.get("/logout", (req, res) => {
  res.sendFile(path.join(viewsPath, "index.html"));
});

router.get("*", (req, res) => {
  res.sendFile(path.join(viewsPath, "404.html"));
});

router.post("*", (req, res) => {
  res.status(404).send({
    error: "Not found"
  });
});

module.exports = router;
