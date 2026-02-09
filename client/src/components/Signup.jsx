import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from "axios";
import { FaRegEyeSlash} from "react-icons/fa";
import toast from "react-hot-toast";
import { Authurl } from "../assets/api";
import { useNavigate } from "react-router-dom";

const Signup = ({ setActive, setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [repeatShowPassword, setRepeatShowPassword] = useState(false);
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skillsOffered, setSkillsOffered] = useState([]);

  const [learnInput, setLearnInput] = useState("");
  const [skillsToLearn, setSkillsToLearn] = useState([]);

  const navigate = useNavigate();
  const [error, setError] = useState({
    nameError: "",
    emailError: "",
    contactError: "",
    passwordError: "",
    repeatPasswordError: "",
  });
  const [formValid, setFormValid] = useState(false);
  const validateName = (name) => {
    let nError = error.nameError;
    let isValid = formValid;

    if (name.trim().length < 2) {
      nError = "This is invalid";
      isValid = false;
    } else {
      isValid = true;
      nError = "";
    }

    setName(name);
    setFormValid(isValid);
    setError({ ...error, nameError: nError });

    return isValid;
  };

  const validateEmail = (email) => {
    let eError = error.emailError;
    let isValid = formValid;

    if (!/[A-Za-z0-9%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}/.test(email)) {
      eError = "This is invalid";
      isValid = false;
    } else {
      isValid = true;
      eError = "";
    }

    setEmail(email);
    setFormValid(isValid);
    setError({ ...error, emailError: eError });

    return isValid;
  };

  const validateContact = (contact) => {
    let cError = error.contactError;
    let isValid = formValid;

    if (!/^\d{10}$/.test(contact)) {
      cError = "Enter valid number";
      isValid = false;
    } else {
      isValid = true;
      cError = "";
    }

    setContact(contact);
    setFormValid(isValid);
    setError({ ...error, contactError: cError });

    return isValid;
  };

  const validatePassword = (password) => {
    let pError = error.passwordError;
    let isvalid = formValid;

    if (password.trim().length < 9) {
      pError = "Enter atleast 8 char with Capital & special character";
      isvalid = false;
    } else if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()-+=])(?=\S+$).{8,20}$/.test(
        password,
      )
    ) {
      pError = "This is invalid password";
      isvalid = false;
    } else {
      isvalid = true;
      pError = "";
    }
    setPassword(password);
    setFormValid(isvalid);
    setError({ ...error, passwordError: pError });

    return isvalid;
  };

  const validateRepeatPassword = (repeatPassword) => {
    let rpError = error.repeatPasswordError;
    let isvalid = formValid;

    if (repeatPassword !== password) {
      rpError = "Password not matched";
      isvalid = false;
    } else {
      ((isvalid = true), (rpError = ""));
    }
    setRepeatPassword(repeatPassword);
    setFormValid(isvalid);
    setError({ ...error, repeatPasswordError: rpError });

    return isvalid;
  };

  const addSkill = (skill, setSkillList, list) => {
    if (skill.trim() && !list.includes(skill)) {
      setSkillList([...list, skill.trim()]);
    }
  };

  const removeSkill = (skill, setSkillList, list) => {
    setSkillList(list.filter((s) => s !== skill));
  };

  const handleChange = (e) => {
    if (e.target.id === "name") {
      validateName(e.target.value);
    } else if (e.target.id === "email") {
      validateEmail(e.target.value);
    } else if (e.target.id === "contact") {
      validateContact(e.target.value);
    } else if (e.target.id === "password") {
      validatePassword(e.target.value);
    } else if (e.target.id === "repeatPassword") {
      validateRepeatPassword(e.target.value);
    }
  };

  const handleSignup = () => {
    if (
      validateName(name.trim().toLowerCase()) &&
      validateEmail(email) &&
      validateContact(contact) &&
      validatePassword(password) &&
      validateRepeatPassword(repeatPassword)
    ) {
      const userData = {
        name,
        email,
        contact,
        password,
        location,
        availability,
        skillsOffered,
        skillsToLearn,
      };
      // localStorage.setItem("user", JSON.stringify(userData));
      // toast("Signup Successful", {
      //   icon: <FaCheck style={{ color: "green", fontSize: "20px" }} />,
      // });
      // setUser(userData);

      axios
        .post(`${Authurl}/signup`, userData)
        .then((response) => {
          const { token, user } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
          toast.success("Signup Successful");
          setUser(user);
          setName("");
          setContact("");
          setEmail("");
          setPassword("");
          setRepeatPassword("");
        })
        .catch((error) => {
          if (error.response?.status === 400) {
            toast.error(error.response.data.error);
          } else {
            toast.error("Signup failed. Please try again.");
          }
        });
    }
    //  else {
    //   toast("Error", {
    //     icon: <FaTimes style={{ color: "red", fontSize: "20px" }} />,
    //   });
    // }
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex justify-center items-center flex-1">
        <div className="bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
            Create Account
          </h2>

          {/* Name and Contact Number */}
          <div className="mb-2 sm:flex sm:flex-wrap gap-2 ">
            <input
              type="name"
              id="name"
              value={name}
              onChange={handleChange}
              className="w-full sm:w-fit px-4 py-2 mb-2 sm:mb-0 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
            {error.nameError && (
              <p className="text-sm text-red-500 mt-1">{error.nameError}</p>
            )}
            <input
              type="contact"
              id="contact"
              value={contact}
              onChange={handleChange}
              className="w-full sm:w-fit px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Contact Number"
            />
            {error.contactError && (
              <p className="text-sm text-red-500 mt-1">{error.contactError}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-2 relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              className="w-full px-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
            {error.emailError && (
              <p className="text-sm text-red-500 mt-1">{error.emailError}</p>
            )}
          </div>

          {/* Password */}
          <div className="sm:flex sm:flex-row gap-2">
            <div className="mb-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handleChange}
                className="w-full sm:w-fit px-3 py-2 border rounded-lg text-sm pr-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Password"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
              </div>
              {error.passwordError && (
                <p className="text-sm text-red-500 mt-1">
                  {error.passwordError}
                </p>
              )}
            </div>

            <div className="mb-2 relative">
              <input
                type={repeatShowPassword ? "text" : "password"}
                id="repeatPassword"
                value={repeatPassword}
                onChange={handleChange}
                className="w-full sm:w-fit px-2 py-2 border rounded-lg text-sm pr-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Repeat Password"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setRepeatShowPassword(!repeatShowPassword)}
              >
                {repeatShowPassword ? (
                  <FaRegEyeSlash />
                ) : (
                  <MdOutlineRemoveRedEye />
                )}
              </div>
              {error.repeatPasswordError && (
                <p className="text-sm text-red-500 mt-1">
                  {error.repeatPasswordError}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 mb-2  focus:outline-none border rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
            placeholder="Your Location (City)"
          />

          {/* Availability */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Availability
            </label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select availability</option>
              <option value="Flexible">Flexible</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Skills You Can Offer
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 border rounded-lg text-sm"
                placeholder="Add a skill you can teach (required)"
                required
              />
              <button
                onClick={() => {
                  addSkill(skillInput, setSkillsOffered, skillsOffered);
                  setSkillInput("");
                }}
                className="bg-blue-600 text-white px-4 rounded-lg"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {skillsOffered.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                  <button
                    onClick={() =>
                      removeSkill(skill, setSkillsOffered, skillsOffered)
                    }
                    className="text-blue-500 hover:text-red-500"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Skills You Want to Learn
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={learnInput}
                onChange={(e) => setLearnInput(e.target.value)}
                className="flex-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 py-2 border rounded-lg text-sm"
                placeholder="Add a skill you want to learn (required)"
                required
              />
              <button
                onClick={() => {
                  addSkill(learnInput, setSkillsToLearn, skillsToLearn);
                  setLearnInput("");
                }}
                className="bg-blue-600 text-white px-4 rounded-lg"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {skillsToLearn.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                  <button
                    onClick={() =>
                      removeSkill(skill, setSkillsToLearn, skillsToLearn)
                    }
                    className="text-green-600 hover:text-red-500"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Create Account
          </button>

          <div className="text-sm text-center mt-4 text-gray-600">
            <span>Already have an account?</span>
            <button
              className="ml-1 text-blue-600 hover:underline"
              onClick={() => setActive(1)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
