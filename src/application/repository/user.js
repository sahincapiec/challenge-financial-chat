const db = require("../../adapters/db/mongoose");
const userSchema = require("./schema/user");
const bcrypt = require("bcryptjs");

userSchema.statics.findByCredentials = (email, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email })
      .then(user => {
        if (user && isMatch(password, user.password)) {
          resolve(user);
        }
        reject(new Error("Unable to login"));
      })
      .catch(error => reject(new Error(error.message)));
  });
};

const User = db.model("User", userSchema);

const isMatch = (string, hash) => {
  return bcrypt.compare(string, hash);
};

module.exports = User;
