const router = require("express").Router();
const Login = require("../../models/admin/Login");
const bcrypt = require("bcryptjs");

//New Admin
router.post("/new", async (req, res) => {
  const { username, email, password} = req.body;

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
module.exports = router;
