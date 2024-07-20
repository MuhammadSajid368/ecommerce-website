const express = require('express');
const authRouter = express.Router();

const { preSignup, signup, accountActivation, login, userDetail, userLogout, fetchAllUsers, updateUser } = require('../controller/auth/authController');

// Validators
const { userSignupValidator, userLoginValidator } = require('../validator/auth');
const { runValidation } = require('../validator/index');
const authToken = require('../middleware/authToken');

authRouter.post('/pre-signup', userSignupValidator, runValidation, preSignup);
authRouter.post('/signup', signup);
authRouter.post('/account-activation', accountActivation);
authRouter.post('/login', userLoginValidator, runValidation, login);
authRouter.get("/user-details", authToken, userDetail);
authRouter.get("/userLogout", userLogout);

// Admin Panel
authRouter.get("/all-users", authToken, fetchAllUsers);
authRouter.post("/update-user", authToken, updateUser);

module.exports = authRouter;
