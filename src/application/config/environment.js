const path = require("path");

const defaultPort = 3000;
const viewsPath = path.join(__dirname, "../../application/views");
const dbUrl = "mongodb://localhost:27017/financial-chat";

module.exports = { dbUrl, defaultPort, viewsPath };
