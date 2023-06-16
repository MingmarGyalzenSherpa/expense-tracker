const express = require("express");
const authController = require("../controller/authController");

const authRoute = express.Router();
authRoute.post("/login", authController.handleLogin);

authRoute.post("/signup", authController.handleSignUp);

module.exports = authRoute;
