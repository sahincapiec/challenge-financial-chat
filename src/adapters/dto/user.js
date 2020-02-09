class User {
  constructor(user, token) {
    this.name = user.name;
    this.email = user.email;
    this.token = token;
  }
}

module.exports = User;
