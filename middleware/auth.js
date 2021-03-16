const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Authentication Credentials were not provided" });
  }

  try {
    jwt.verify(token, config.get("JWTSECRET"), (error, decoded) => {
      if (error) return res.status(401).json({ msg: "Invalid Token" });
      req.user = decoded.user;
      next();
    });
  } catch (error) {
    console.error("Something wrong with Auth Middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
