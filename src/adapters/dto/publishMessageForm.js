class PublishMessageForm {
  constructor(textForm) {
    const params = textForm
      .split("&")
      .map(paramLine =>
        paramLine.split("=").map(param => decodeURIComponent(param))
      );
    this.message = params.filter(param => param[0] === "message")[0][1];
  }
}

module.exports = PublishMessageForm;
