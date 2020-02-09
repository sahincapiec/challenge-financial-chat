const mongoose = require("mongoose");
const { dbUrl } = require("../../application/config/environment");

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true
});

module.exports = mongoose;
