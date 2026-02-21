const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validate = require("../utils/validator");

// ================= REGISTER =================

const register = async (req, res) => {
  try {
    validate(req.body);

    const { emailId, password } = req.body;

    // hash password
    req.body.password = await bcrypt.hash(password, 10);

    const user = await User.create(req.body);

    const token = jwt.sign(
      { _id: user._id, emailId: emailId },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });

    res.status(201).send("User Registered successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

// ================= LOGIN =================

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      throw new Error("Invalid Credential");
    }

    // find user
    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid Credential");
    }

    // compare password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Invalid Credential");
    }

    // create token
    const token = jwt.sign(
      { _id: user._id, emailId: emailId },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });

    res.status(200).send("Logged in successfully");
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
};

// ================= LOGOUT =================

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("Logged out successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = { register, login, logout };