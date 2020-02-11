const amqp = require("amqplib/callback_api");
const { amqConnectionString } = require("../../application/config/environment");

const sendMessage = async (message, queue) => {
  amqp.connect(amqConnectionString, (error, connection) => {
    if (error) {
      throw new Error("Failed creating connection to send message.");
    }

    connection.createChannel((error, channel) => {
      if (error) {
        throw new Error("Failed creating channel to send message");
      }

      channel.sendToQueue(queue, Buffer.from(message));
    });

    setTimeout(() => {
      connection.close();
    }, 500);
  });
};

const readMessage = async (queue, callback) => {
  amqp.connect(amqConnectionString, (error, connection) => {
    if (error) {
      throw new Error("Failed creating connection to send message.");
    }

    connection.createChannel((error, channel) => {
      if (error) {
        throw new Error("Failed creating channel to send message");
      }

      channel.consume(queue, callback, {
        noAck: true
      });
    });
  });
};

module.exports = { readMessage, sendMessage };
