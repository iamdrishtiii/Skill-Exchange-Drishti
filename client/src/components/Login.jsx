import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash} from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { Authurl } from "../assets/api";
import { useNavigate } from "react-router-dom";

const Login = ({ setActive, setUser }) => {
  const [email_contact, setEmail_Contact] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState({
    ecError: "",
    passwordError: "",
  });
  const [formValid, setFormValid] = useState(false);

  const validateEmailContact = (email_contact) => {
    // 1. Define your patterns
    const emailRegex = /^[A-Za-z0-9%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^\d{10}$/;

    // 2. Check if EITHER one matches
    const isValid =
      emailRegex.test(email_contact) || phoneRegex.test(email_contact);

    // 3. Set error message based on the result
    const eError = isValid ? "" : "Invalid Email or Phone Number";

    // 4. Update state
    setEmail_Contact(email_contact);
    setFormValid(isValid);
    setError({ ...error, ecError: eError });

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

  const handleChange = (e) => {
    if (e.target.id === "email_contact") {
      validateEmailContact(e.target.value);
    } else if (e.target.id === "password") {
      validatePassword(e.target.value);
    }
  };

  const handleLogin = () => {
    if (validateEmailContact(email_contact) & validatePassword(password)) {
      const userData = { email_contact, password };
      // localStorage.setItem("user", JSON.stringify(userData));
      // toast("Login Successful", {
      //   icon: <FaCheck style={{ color: "green", fontSize: "20px" }} />,
      // });
      // setUser(userData);
      axios
        .post(`${Authurl}/login`, userData)
        .then((response) => {
          const { token, user } = response.data;
          
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
          toast.success("Login Successful");
          setUser(user);
          setPassword("");
          setEmail_Contact("");
        })
        .catch((error) => {
          console.log(error.response?.data);
          toast.error("Invalid Credentials");
        });
    }
    // } else {
    //   toast("Error", {
    //     icon: <FaTimes style={{ color: "red", fontSize: "20px" }} />,
    //   });
    
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-xl">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Login to your Account
          </h2>

          <div>
            <input
              id="email_contact"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="Email or Contact Number"
              value={email_contact}
              onChange={handleChange}
              required
            />
            {error.ecError && (
              <p className="text-red-500 text-xs mt-1">{error.ecError}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
              </div>
            </div>
            {error.passwordError && (
              <p className="text-red-500 text-xs mt-1">{error.passwordError}</p>
            )}
          </div>

          <button
            onClick={handleLogin}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none"
          >
            Login
          </button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => setActive(0)}
              className="font-medium text-black hover:underline"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
