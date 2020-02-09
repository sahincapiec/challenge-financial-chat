const path = require("path");

const dbUrl = "mongodb://localhost:27017/financial-chat";
const defaultPort = 3000;
const tokenExpiration = "1 day";
const tokenSign = "challenge-financial-chat";
const viewsPath = path.join(__dirname, "../../application/views");

module.exports = { dbUrl, defaultPort, tokenExpiration, tokenSign, viewsPath };
