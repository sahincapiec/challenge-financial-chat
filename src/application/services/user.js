const User = require("../repository/user");

const create = userData => {
  return new Promise((resolve, reject) => {
    const user = new User(userData);
    user
      .save()
      .then(user =>
        user
          .generateAuthToken()
          .then(({ user, token }) => resolve({ user, token }))
          .catch(error => reject(new Error(error.message)))
      )
      .catch(error => {
        reject(
          validateNameError(error.errors.name) ||
            validateEmailError(error.errors.email) ||
            validatePasswordError(error.errors.password) ||
            new Error("The given user is invalid.")
        );
      });
  });
};

const validateEmailError = error => {
  if (error) {
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
  if (error) {
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
  if (error) {
    switch (error.kind) {
      case "required":
        return new Error("The name is required.");
      default:
        return new Error("The name is invalid.");
    }
  }
};

const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    User.findByCredentials(email, password)
      .then(user =>
        user
          .generateAuthToken()
          .then(({ user, token }) => resolve({ user, token }))
          .catch(error => reject(new Error(error.message)))
      )
      .catch(error => reject(new Error(error.message)));
  });
};

module.exports = { create, login };
