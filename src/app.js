const express = require("express");
const indexRoutes = require("./adapters/routes/index");
const chatroomsRoutes = require("./adapters/routes/chatrooms");
const { defaultPort } = require("./application/config/environment");

const app = express();
const port = process.env.PORT || defaultPort;

app.use("/chatrooms", chatroomsRoutes);
app.use("/", indexRoutes);

app.listen(port, () => {
  console.log("Server is up on port: ", port);
});
