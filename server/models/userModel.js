const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase:true,
    },
    contact: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },

    availability: {
      type: String,
      enum: ["Flexible","Morning", "Evening","Weekdays","Weekends" ],
      default: "",
    },

    skillsOffered: {
      type: [String],
      default: [],
    },

    skillsToLearn: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);
const user = mongoose.model("user", userSchema);
module.exports = user;
