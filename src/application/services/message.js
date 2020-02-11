const Message = require("../repository/message");
const { processCommand } = require("./bot");

const create = async (messageForPublish, user, roomId) => {
  if (messageForPublish && isCommand(messageForPublish)) {
    processCommand(messageForPublish, roomId);
    return;
  }
  try {
    const message = new Message({
      message: messageForPublish,
      roomId,
      timestamp: new Date().getTime(),
      owner: user._id
    });
    await message.save();
    return message;
  } catch (error) {
    throw validateMessageError(error.errors) ||
      validateTimestampError(error.errors) ||
      validateRoomIdError(error.errors) ||
      validateOwnerError(error.errors) ||
      new Error(error.message);
  }
};

const validateMessageError = error => {
  if (error && error.message) {
    switch (error.kind) {
      case "required":
        return new Error("The message is required.");
      default:
        return new Error("The message is invalid.");
    }
  }
};

const validateRoomIdError = error => {
  if (error && error.roomId) {
    switch (error.kind) {
      case "required":
        return new Error("The roomId is required.");
      default:
        return new Error("The roomId is invalid.");
    }
  }
};

const validateTimestampError = error => {
  if (error && error.timestamp) {
    switch (error.kind) {
      case "required":
        return new Error("The timestamp is required.");
      default:
        return new Error("The timestamp is invalid.");
    }
  }
};

const validateOwnerError = error => {
  if (error && error.owner) {
    switch (error.kind) {
      case "required":
        return new Error("The user is required.");
      default:
        return new Error("The user is invalid.");
    }
  }
};

const isCommand = messageForPublish => {
  return messageForPublish.match(/[/]stock[=]/);
};

const loadMessages = async roomId => {
  const messages = await Message.find({ roomId })
    .populate({
      path: "owner",
      select: "name"
    })
    .sort({ timestamp: -1 })
    .limit(50);
  return messages.map(
    message =>
      `(${new Date(message.timestamp)})${message.owner.name}: ${
        message.message
      }`
  );
};

module.exports = { create, loadMessages };
