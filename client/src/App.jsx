import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import MyRequest from "./pages/MyRequest";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <div className="relative min-h-[100vh]  max-w-[1600vh]">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/requested" element={<MyRequest />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
