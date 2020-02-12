const path = require("path");

const amqConnectionString = "amqp://localhost";
const dbUrl = "mongodb://localhost:27017/financial-chat-test";
const defaultPort = 3001;
const queueStockQuote = "stock-quote-test";
const tokenExpiration = "1 day";
const tokenSign = "challenge-financial-chat-test";
const viewsPath = path.join(__dirname, "..", "..", "application", "views");
const tempPath = path.join(__dirname, "..", "..", "adapter", "temp");

module.exports = {
  amqConnectionString,
  dbUrl,
  defaultPort,
  queueStockQuote,
  tempPath,
  tokenExpiration,
  tokenSign,
  viewsPath
}