const User = require("../repository/user");

const create = async userData => {
  try {
    const user = new User(userData);
    await user.save();
    await user.generateAuthToken();
    return { user, token };
  } catch (error) {
    throw validateNameError(error.errors) ||
      validateEmailError(error.errors) ||
      validatePasswordError(error.errors) ||
      new Error(error.message);
  }
};

const validateEmailError = error => {
  if (error && error.email) {
    switch (error.kind) {
      case "user defined":
        return new Error("The email is invalid.");
      case "required":
        return new Error("The email is required.");
      default:
        return new Error("The email is invalid.");
    }
  }
};

const validatePasswordError = error => {
  if (error && error.password) {
    switch (error.kind) {
      case "minlength":
        return new Error(
          "The password is shorter than the minimum allowed length (8)."
        );
      case "required":
        return new Error("The password is required.");
      default:
        return new Error("The password is invalid.");
    }
  }
};

const validateNameError = error => {
  if (error && error.name) {
    switch (error.kind) {
      case "required":
        return new Error("The name is required.");
      default:
        return new Error("The name is invalid.");
    }
  }
};

const login = async ({ email, password }) => {
  const user = await User.findByCredentials(email, password);
  if (user) {
    const token = await user.generateAuthToken();
    if (token) {
      return { user, token };
    }
  }
  new Error(error.message);
};

module.exports = { create, login };
