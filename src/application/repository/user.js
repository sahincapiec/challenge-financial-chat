const db = require("../../adapters/db/mongoose");
const userSchema = require("./schema/user");
const bcrypt = require("bcryptjs");

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (user && (await isMatch(password, user.password))) {
    return user;
  }

  throw new Error("Unable to login");
};

const User = db.model("User", userSchema);

const isMatch = async (string, hash) => {
  return bcrypt.compare(string, hash);
};

module.exports = User;
