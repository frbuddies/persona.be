const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const User = require("../model/users");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password are required",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const client_id = uuidv4();
    const link = `${process.env.FE_URL}?client_id=${client_id}`;

    const user = await User.create({
      email,
      password: hashedPassword,
      client_id,
      link,
    });

    res.status(201).json({
      success: true,
      data: {
        client_id,
        link
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const setPassword = async (req, res) => {
  try {
    const { client_id, password } = req.body;
    console.log("🚀 ~ setPassword ~ client_id, password:", client_id, password)

    if (!client_id || !password) {
      return res.status(400).json({
        success: false,
        message: "client_id and password are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOneAndUpdate(
      { client_id },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password are required",
      });
    }

    const user = await User.findOne({ email });
    console.log("🚀 ~ loginUser ~ user:", user)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🚀 ~ loginUser ~ isMatch:", isMatch)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      client_id: user?.client_id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  setPassword,
  loginUser,
};
