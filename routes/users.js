const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User Already Exists" }] });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    jwt.sign(
      { user: user.id },
      config.get("JWTSECRET"),
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            date: user.date,
          },
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("SERVER ERROR");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched)
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

    jwt.sign(
      { user: user.id },
      config.get("JWTSECRET"),
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            date: user.date,
          },
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("SERVER ERROR");
  }
});

module.exports = router;
