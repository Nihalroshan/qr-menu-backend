const router = require("express").Router();
const Login = require("../models/Login");
const bcrypt = require("bcryptjs");

//New Admin
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  //Hashing
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  let login = new Login({
    username,
    email,
    password: hashPassword,
  });
  try {
    login = await login.save();
    res.send({
      message: "Register successfull",
      user: {
        id: login._id,
        username: login.username,
      },
    });
  } catch (err) {
    res.send({ message: err });
  }
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Login.findOne({ email: email });
    if (!user) return res.status(400).send("Email doesn't match.");

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) return res.status(400).send("Password doesn't match");
    res.send({
      message: "Login successfull",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
