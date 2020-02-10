const express = require("express");
const path = require("path");
const { viewsPath } = require("../../application/config/environment");
const LoginForm = require("../dto/loginForm");
const SigninForm = require("../dto/signinForm");
const { authByCookies, login, create } = require("../../application/services/user");
const cookieParser = require("../../application/services/cookie");

const router = express.Router();

router.get("/logout", cookieParser);
router.get("/logout", authByCookies);

router.get("/", (req, res) => {
  res.sendFile(path.join(viewsPath, "index.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(viewsPath, "session", "login.html"));
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
      res
        .status(200)
        .cookie("name", user.name)
        .cookie("email", user.email)
        .cookie("token", `Bearer ${token.token}`)
        .redirect("/chatrooms");
    } catch (error) {
      res.status(400).render("error", {
        title: "Login failed",
        message: error,
        newLocation: "/login"
      });
    }
  }
);

router.get("/signin", (req, res) => {
  res.sendFile(path.join(viewsPath, "session", "signin.html"));
});

router.post(
  "/signin",
  express.text({
    type: "application/x-www-form-urlencoded"
  }),
  async (req, res) => {
    try {
      const userData = new SigninForm(req.body);
      const { user, token } = await create(userData);
      res
        .status(200)
        .cookie("name", user.name)
        .cookie("email", user.email)
        .cookie("token", `Bearer ${token.token}`)
        .redirect("/chatrooms");
    } catch (error) {
      res.status(400).render("error", {
        title: "Signin failed",
        message: error,
        newLocation: "/signin"
      });
    }
  }
);

router.get("/logout", async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );
    await req.user.save();
    res
      .clearCookie("name")
      .clearCookie("email")
      .clearCookie("token")
      .sendFile(path.join(viewsPath, "index.html"));
  } catch (error) {
    res.render("error", {
      title: "Logout failed",
      message: error.message,
      newLocation: "/"
    });
  }
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
