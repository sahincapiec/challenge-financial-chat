const { readMessage } = require("../../adapters/amq/rabbitmq");
const { queueStockQuote } = require("../config/environment");
const process = require("../processors/stockQuote");

const startSubscribers = () => {
  readMessage(queueStockQuote, async message => {
    process(message);
  });
};

module.exports = startSubscribers;
