const express = require("express");
const indexRoutes = require("./adapters/routes/index");
const chatroomsRoutes = require("./adapters/routes/chatrooms");
const commandsRoutes = require("./adapters/routes/commands");
const { defaultPort } = require("./application/config/environment");

const app = express();
const port = process.env.PORT || defaultPort;

app.use("/chatrooms", chatroomsRoutes);
app.use("/commands", commandsRoutes);
app.use("/", indexRoutes);

app.listen(port, () => {
  console.log("Server is up on port: ", port);
});
