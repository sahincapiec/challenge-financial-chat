const db = require("../../../adapters/db/mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jsonWebToken = require("jsonwebtoken");
const { tokenExpiration, tokenSign } = require("../../config/environment");

const userSchema = new db.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = function() {
  const user = this;
  const token = jsonWebToken.sign({ _id: user._id.toString() }, tokenSign, {
    expiresIn: tokenExpiration
  });

  user.tokens = user.tokens.concat({ token });
  return new Promise((resolve, reject) => {
    user
      .save()
      .then(user => {
        resolve({ user, token });
      })
      .catch(error => reject(new Error(error.message)));
  });
};

module.exports = userSchema;
