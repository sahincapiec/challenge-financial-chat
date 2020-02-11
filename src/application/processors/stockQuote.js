const { publishMessage } = require("../services/bot");

const process = async message => {
  const jsonMessage = JSON.parse(message.content.toString());
  publishMessage(jsonMessage);
};

module.exports = process;
