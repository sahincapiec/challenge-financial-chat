const express = require("express");
const indexRoutes = require("./routes/index");
const chatroomsRoutes = require("./routes/chatrooms");

const app = express();
const port = process.env.PORT || 3000;

app.use("/chatrooms", chatroomsRoutes);
app.use("/", indexRoutes);

app.listen(port, () => {
  console.log("Server is up on port: ", port);
});
