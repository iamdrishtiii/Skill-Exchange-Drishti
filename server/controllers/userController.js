const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const allusers = async(req,res)=>{
     try {
  
        const alluser = await User.find({})
        res.status(200).json({
           message: "Fetched all users",
           alluser
        })
     } catch (error) {
        res.status(500).json({ error: "Internal server error" })
     }

}

const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      password,
      location,
      availability,
      skillsOffered,
      skillsToLearn,
    } = req.body;

    // Check if user already exists (email OR contact)
    const existingUser = await User.findOne({
      $or: [{ email }, { contact }],
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const createdUser = new User({
      name,
      email,
      contact,
      password: hashedPassword,
      location,
      availability,
      skillsOffered,
      skillsToLearn,
    });

    await createdUser.save();

    // JWT payload
    const payload = {
      userId: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "User created successfully",
      token,
      user: createdUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email_contact, password } = req.body;
    const isEmail = /^[A-Za-z0-9%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/.test(
      email_contact,
    );
    const query = isEmail
      ? { email: email_contact }
      : { contact: email_contact };

    const user = await User.findOne(query);

    // Compare password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const payload = { userId: user._id, name: user.name, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ message: "Login successfully", token, user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { location, availability, skillsOffered, skillsToLearn } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {
        location,
        availability,
        skillsOffered,
        skillsToLearn,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Profile update failed" });
  }
};

module.exports = {allusers, signup, login , updateProfile}