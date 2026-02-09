import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setShowDropdown(false);
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 py-2">
      <div className="flex justify-between items-center px-6 py-1">
        {/* Left: Hamburger (mobile only, logged-in only) */}
        {user && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl md:hidden"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        )}

        {/* Center: Logo */}
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img src="../Logo.png" alt="Logo" className="w-36" />
        </Link>

        {/* Right: Desktop nav + profile */}
        <div className="flex items-center gap-6">
          {/* Desktop Nav */}
          {user && (
            <nav className="hidden md:flex gap-8">
              <Link
                to="/"
                onClick={() => setActive("home")}
                className={`${active === "home" ? "text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
              >
                Explore Skills
              </Link>
              <Link
                to="/requested"
                onClick={() => setActive("request")}
                className={`${active === "request" ? "text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
              >
                My Request
              </Link>
            </nav>
          )}

          {/* Profile / Auth */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-gray-500">Welcome,</p>
                  <p className="text-sm font-bold text-blue-600">{user.name}</p>
                </div>
                <CgProfile
                  className={`text-3xl ${
                    showDropdown ? "text-blue-600" : "text-gray-600"
                  }`}
                />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-3 w-40 bg-white border shadow-lg rounded-lg">
                  <Link
                    to="/auth"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 text-sm hover:bg-blue-50"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="text-gray-600 hover:text-blue-500">
              Sign in
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {user && isOpen && (
        <div className="flex justify-center">
          <div className="md:hidden bg-white px-6 py-4 space-y-4">
            <Link
              to="/"
              onClick={() => {
                setActive("home");
                setIsOpen(false);
              }}
              className={`block ${active === "home" ? "text-blue-600" : "text-gray-700"}`}
            >
              Explore Skills
            </Link>
            <Link
              to="/requested"
              onClick={() => {
                setActive("request");
                setIsOpen(false);
              }}
              className={`block ${active === "request" ? "text-blue-600" : "text-gray-700"}`}
            >
              My Request
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
