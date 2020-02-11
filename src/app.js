const express = require("express");
const indexRoutes = require("./application/routes/index");
const chatroomsRoutes = require("./application/routes/chatrooms");
const commandsRoutes = require("./application/routes/commands");
const queriesRoutes = require("./application/routes/queries");
const { defaultPort } = require("./application/config/environment");
const { viewsPath } = require("./application/config/environment");
const startSubscribers = require("./application/subscribers/subscribers");

const app = express();
const port = process.env.PORT || defaultPort;

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use("/chatrooms", chatroomsRoutes);
app.use("/commands", commandsRoutes);
app.use("/queries", queriesRoutes);
app.use("/", indexRoutes);

startSubscribers();

app.listen(port, () => {
  console.log("Server is up on port: ", port);
});
