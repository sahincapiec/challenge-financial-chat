const express = require("express");
const app = require('./app')
const { defaultPort } = require("./application/config/environment");

const port = defaultPort;

app.listen(port, () => {
  console.log("Server is up on port: ", port);
});
