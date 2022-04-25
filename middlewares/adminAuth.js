const Login = require("../models/Login");

module.exports = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) return res.status(400).send("No token provided");

    const adminUser = await Login.find({ _id: token });
    if (!adminUser) return res.status(401).send("Unauthorized");
    next();
  } catch (err) {
    res.status(400).send("Bad request");
  }
};
