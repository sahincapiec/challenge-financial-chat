const authByCookies = async (req, res, next) => {
  next();
};

module.exports = { authByCookies };
