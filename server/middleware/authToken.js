const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config({ path: "../config/config.env" });

const authToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Please Login....!",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Token is not valid",
          error: true,
          success: false,
        });
      }

      req.user = decoded; // Attach decoded payload to req.user
      console.log("Decoded user:", req.user); // Debug log to check the user
      next();
    });
  } catch (err) {
    console.log("Auth token error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = authToken;
