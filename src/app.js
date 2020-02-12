const express = require("express");
const indexRoutes = require("./application/routes/index");
const chatroomsRoutes = require("./application/routes/chatrooms");
const commandsRoutes = require("./application/routes/commands");
const queriesRoutes = require("./application/routes/queries");
const { viewsPath } = require("./application/config/environment");
const startSubscribers = require("./application/subscribers/subscribers");

const app = express();

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use("/chatrooms", chatroomsRoutes);
app.use("/commands", commandsRoutes);
app.use("/queries", queriesRoutes);
app.use("/", indexRoutes);

startSubscribers();

module.exports = app