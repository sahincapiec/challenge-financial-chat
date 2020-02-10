const mongoose = require("mongoose");
const db = require("../../../adapters/db/mongoose");

const messageSchema = new db.Schema({
  message: {
    type: String,
    required: true,
    trim: true
  },
  roomId: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

module.exports = messageSchema;
