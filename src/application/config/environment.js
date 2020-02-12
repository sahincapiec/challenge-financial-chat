const path = require("path");

const amqConnectionString = "amqp://localhost";
const dbUrl = "mongodb://localhost:27017/financial-chat";
const defaultPort = 3000;
const queueStockQuote = "stock-quote";
const tokenExpiration = "1 day";
const tokenSign = "challenge-financial-chat";
const viewsPath = path.join(__dirname, "..", "..", "application", "views");

module.exports = {
  amqConnectionString,
  dbUrl,
  defaultPort,
  queueStockQuote,
  tokenExpiration,
  tokenSign,
  viewsPath
};
