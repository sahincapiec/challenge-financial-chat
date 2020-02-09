class LoginForm {
  constructor(textForm) {
    const params = textForm
      .split("&")
      .map(paramLine =>
        paramLine.split("=").map(param => decodeURIComponent(param))
      );
    this.email = params.filter(param => param[0] === "email")[0][1];
    this.password = params.filter(param => param[0] === "password")[0][1];
  }
}

module.exports = LoginForm;
