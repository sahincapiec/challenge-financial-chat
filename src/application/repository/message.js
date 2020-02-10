const db = require("../../adapters/db/mongoose");
const messageSchema = require("./schema/message");

const Message = db.model("Message", messageSchema);

module.exports = Message;
