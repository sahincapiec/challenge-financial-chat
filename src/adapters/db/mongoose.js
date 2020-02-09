const mongoose = require("mongoose");
const { dbUrl } = require("../../application/config/environment");

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

module.exports = mongoose;
