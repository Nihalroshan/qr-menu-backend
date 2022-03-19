const router = require("express").Router();
const Login = require("../../models/admin/Login");
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");

//New Admin
router.post("/new", async (req, res) => {
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
    res.send(login);
  } catch (err) {
    res.send({ message: err });
  }
});

//Admin login
router.post("/", async (req, res) => {
  //check if email exists
  const adminEmail = await Login.findOne({ email: req.body.email });
  if (!adminEmail) return res.status(404).send("Email doesnt exists");
  //password is correct
  const validPass = await bcrypt.compare(req.body.password, login.password);
  if (!validPass)
    return res.status(404).send("Email and password doesnt match");

  res.send("logged in");
});

module.exports = router;
