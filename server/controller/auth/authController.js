const dotenv = require('dotenv');
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

dotenv.config({ path: "../../config/config.env" });

// Transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD
  }
});
const preSignup = async (req, res) => {
  const { name, email, password, profilePic } = req.body;

  try {
    // Check if user already exists
    const user = await User.findOne({ email }).exec();
    if (user) {
      return res.status(400).json({
        error: 'Email is already taken'
      });
    }

    // Default role assignment
    const role = "GENERAL";

    // Generate token for account activation
    const token = jwt.sign({ name, email, password, profilePic, role }, process.env.TOKEN_SECRET_KEY, { expiresIn: '10m' });

    // Prepare email data
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Account activation link',
      html: `
        <h1>Please use the following link to activate your account</h1>
        <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>${process.env.CLIENT_URL}</p>
      `
    };

    // Send activation email
    transporter.sendMail(emailData, (err, info) => {
      if (err) {
        console.error('Email sending error:', err);
        return res.status(400).json({
          error: 'Failed to send activation email. Please try again.'
        });
      }
      return res.json({
        message: `Email has been sent to ${email}. Follow the instructions to activate your account.`
      });
    });
  } catch (err) {
    console.error('Pre-signup error:', err);
    return res.status(500).json({
      error: 'Server error. Please try again later.'
    });
  }
};



const signup = async (req, res) => {

  const { token } = req.body;

  try {
    // Verify token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: 'Expired or invalid token. Please signup again.'
        });
      }

      // Destructure decoded token
      const { name, email, password, role } = decoded;

      // Hash password
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      // Create new user including role
      const newUser = new User({ name, email, password: hashPassword, role });

      // Save user to database
      await newUser.save();

      return res.json({
        message: 'Signup success! Please login.'
      });
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({
      error: 'Server error. Please try again later.'
    });
  }
};

// Account activation function
const accountActivation = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: 'Expired or invalid token. Please signup again.'
        });
      }

      // Destructure decoded token
      const { name, email, password, role, profilePic } = decoded;

      // Hash password
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      // Create new user including role and profilePic
      const newUser = new User({ name, email, password: hashPassword, role, profilePic });

      // Save user to database
      await newUser.save();

      return res.json({
        message: 'Account activation success! Please login.'
      });
    });
  } catch (err) {
    console.error('Account activation error:', err);
    return res.status(500).json({
      error: 'Server error. Please try again later.'
    });
  }
};


// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Please provide all fields',
      error: true,
      success: false,
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        message: 'Password is incorrect',
        error: true,
        success: false,
      });
    }

    const tokenData = {
      _id: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: '8h',
    });

    const tokenOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    };

    res.cookie('token', token, tokenOption).json({
      message: 'Login successfully',
      data: token,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};




const userDetail = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      console.log("user not found!!!");
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    res.status(200).json({
      user, // Adjusted to match what frontend fetch function expects
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
};

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
    const allUsers = await User.find({ _id: { $ne: req.userId } });
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

    const user = await User.findById(sessionId);

    if (!user) {
      throw new Error("User not found");
    }

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const updatedUser = await User.findByIdAndUpdate(userId, payload, {
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
  login,
  signup,
  accountActivation,
  preSignup,
  userDetail,
  userLogout,
  fetchAllUsers,
  updateUser

}
