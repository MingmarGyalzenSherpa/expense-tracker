const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function handleLogin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user === null) {
      return res.status(401).json({ message: "User not found" });
    } else {
      const isMatching = await bcrypt.compare(password, user.password);
      if (isMatching) {
        const token = jwt.sign(
          {
            email: user.email,
            id: user.id.toString(),
          },
          "this-is-secret",
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({
          message: "Logged in successfully!!",
          token,
          user,
        });
      } else {
        return res.status(401).json({ message: "Credential doesn't match!!" });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function handleSignUp(req, res) {
  const password = req.body.password;

  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);
  try {
    const user = await User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      status: "verified",
      role: "user",
      soft_delete: false,
      password: hashPassword,
    });

    console.log("Account created!!");
    res.json({ message: "User successfully created", status: 200 });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { handleLogin, handleSignUp };
