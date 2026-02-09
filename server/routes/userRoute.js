const express = require("express");
const {
  signup,
  login,
  updateProfile,
  allusers,
} = require("../controllers/userController");
const auth = require("../middleware/auth")
const userroute = express.Router();

userroute.post("/signup", signup);
userroute.post("/login", login);
userroute.put("/update-profile",auth, updateProfile);
userroute.get("/get-skills",allusers)

module.exports = userroute;
