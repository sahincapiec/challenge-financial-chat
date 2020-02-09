const db = require("../../adapters/db/mongoose");
const userSchema = require("./schema/user");
const bcrypt = require("bcryptjs");

const User = db.model("User", userSchema);

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

module.exports = User;
