const parser = async (req, res, next) => {
  const cookiesString = req.headers.cookie;
  if (cookiesString) {
    const cookiesArray = cookiesString
      .split(";")
      .map(cookie => cookie.split("="));
    const cookies = [];
    cookiesArray.forEach(cookie => {
      cookies[cookie[0].trim()] = decodeURIComponent(cookie[1]);
    });
    req.cookies = cookies;
  }
  next();
};

module.exports = parser;
