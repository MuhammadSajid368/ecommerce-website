const userModel = require("../models/userModel");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cartModel = require("../models/cartProduct");

dotenv.config({ path: "../config/config.env" });

async function userSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      throw new Error("User already exists");
    }
    if (!email || !name || !password) {
      throw new Error("Please provide all fields");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something went wrong");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

async function userSignIn(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide all fields");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "8h",
      });

      console.log("Generated Token:", token);
      const tokenOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      };
      res.cookie("token", token, tokenOption).json({
        message: "Login successfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Password is incorrect");
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

async function userDetail(req, res) {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      console.log("user not found!!!");
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    res.status(200).json({
      data: user,
      success: true,
      error: false,
      message: "User details retrieved successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

async function userLogout(req, res) {
  try {
    res.clearCookie("token");

    res.json({
      message: "Logged out successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

async function fetchAllUsers(req, res) {
  try {
    console.log(req.userId);
    const allUsers = await userModel.find({ _id: { $ne: req.userId } });
    res.json({
      message: "All User",
      error: false,
      success: true,
      data: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

async function updateUser(req, res) {
  try {
    const { userId, email, name, role } = req.body;
    const sessionId = req.user._id;

    if (!sessionId) {
      throw new Error("Session ID is not provided");
    }

    const user = await userModel.findById(sessionId);

    if (!user) {
      throw new Error("User not found");
    }

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const updatedUser = await userModel.findByIdAndUpdate(userId, payload, {
      new: true,
    });

    res.json({
      data: updatedUser,
      message: "User updated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}



module.exports = {
  userSignIn,
  userSignup,
  userDetail,
  userLogout,
  fetchAllUsers,
  updateUser
};
