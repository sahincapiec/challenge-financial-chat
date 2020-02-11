const request = require("request");
const User = require("../repository/user");
const { sendMessage } = require("../../adapters/amq/rabbitmq");
const { queueStockQuote } = require("../config/environment");

const getFile = async (stockCode, callback) => {
  const formatedStockCode = encodeURIComponent(stockCode);
  request.get(
    `https://stooq.com/q/l/?s=${formatedStockCode}&f=sd2t2ohlcv&h&e=csv`,
    callback
  );
};

const processFile = (error, data) => {
  if (error) {
    throw new Error(error.message);
  }
  const cells = data.body.split("\r\n").map(row => row.split(","));
  const indexOfClose = cells[0].indexOf("Close");
  const close = cells[1][indexOfClose];
  return close;
};

const processCommand = (command, roomId) => {
  const stockCode = command.split("=")[1];
  if (stockCode) {
    getFile(stockCode, (error, data) => {
      const close = processFile(error, data);
      const stockQuoteMessage = `${stockCode} quote is $${close} per share`;
      const message = JSON.stringify({
        message: stockQuoteMessage,
        roomId
      });
      sendMessage(message, queueStockQuote);
    });
  }
};

const publishMessage = async ({ message, roomId }) => {
  const botUser = await getBotUser();
  const { create } = require("./message");
  create(message, botUser, roomId);
};

const getBotUser = async () => {
  const botUser = await User.findOne({ email: "bot@bot.bot" });
  if (botUser) {
    return botUser;
  }

  const newUser = new User({
    name: "Bot",
    email: "bot@bot.bot",
    password: "B0t-P4ssw0rd+"
  });
  await newUser.save();
  return newUser;
};

module.exports = { processCommand, publishMessage };
