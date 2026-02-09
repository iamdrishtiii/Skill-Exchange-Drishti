/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { Authurl } from "../assets/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Profile editable states
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsToLearn, setSkillsToLearn] = useState([]);
  const [offerInput, setOfferInput] = useState("");
  const [learnInput, setLearnInput] = useState("");
  const navigate = useNavigate();
  // Initialize profile fields when user loads
  useEffect(() => {
    if (!user) return;

    setLocation(user.location || "");
    setAvailability(user.availability || "");
    setSkillsOffered(user.skillsOffered || []);
    setSkillsToLearn(user.skillsToLearn || []);
  }, [user]);

  //  helper
  const syncUserToLocalStorage = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  //  ADD SKILL (local + localStorage)
  const addSkill = (value, list, setList, setValue, key) => {
    const trimmed = value.trim();
    if (!trimmed || list.includes(trimmed)) return;

    const updatedList = [...list, trimmed];
    setList(updatedList);
    setValue("");

    const updatedUser = {
      ...user,
      [key]: updatedList,
    };

    syncUserToLocalStorage(updatedUser);
  };

  //  REMOVE SKILL (local + localStorage)
  const removeSkill = (skill, list, setList, key) => {
    const updatedList = list.filter((s) => s !== skill);
    setList(updatedList);

    const updatedUser = {
      ...user,
      [key]: updatedList,
    };

    syncUserToLocalStorage(updatedUser);
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${Authurl}/update-profile`,
        {
          location,
          availability,
          skillsOffered,
          skillsToLearn,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(res.data.user);
      toast.success("Profile updated successfully ");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.error || "Update failed");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setActive(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-amber-50 to-green-50">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        {!user ? (
          <>
            {active === 0 ? (
              <Signup setActive={setActive} setUser={setUser} />
            ) : (
              <Login setActive={setActive} setUser={setUser} />
            )}
          </>
        ) : (
          <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
            <div className="space-y-5">
              {/* Account Info */}
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                {/* Profile Pic (Initial) */}
                <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                {/* Account Details */}
                <div>
                  <p className="text-xs text-blue-600 font-bold uppercase">
                    Account Details
                  </p>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* Location */}
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full px-4 py-2 border rounded-lg text-sm"
              />

              {/* Availability */}
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Availability
                </label>
                <select
                  value={availability}
                  onChange={(e) => {
                    const value = e.target.value;
                    setAvailability(value);

                    const updatedUser = {
                      ...user,
                      availability: value,
                    };

                    syncUserToLocalStorage(updatedUser);
                  }}
                  className="w-full px-4 py-2 border rounded-lg text-sm"
                >
                  <option value="">Select Availability</option>
                  <option value="Flexible">Flexible</option>
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                </select>
              </div>

              {/* Skills Offered */}
              <div>
                <p className="text-sm font-semibold mb-1">Skills You Offer</p>
                <div className="flex gap-2">
                  <input
                    value={offerInput}
                    onChange={(e) => setOfferInput(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  />
                  <button
                    onClick={() =>
                      addSkill(
                        offerInput,
                        skillsOffered,
                        setSkillsOffered,
                        setOfferInput,
                        "skillsOffered",
                      )
                    }
                    className="bg-blue-600 text-white px-4 rounded-lg"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {skillsOffered.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        onClick={() =>
                          removeSkill(
                            skill,
                            skillsOffered,
                            setSkillsOffered,
                            "skillsOffered",
                          )
                        }
                        className="ml-2 text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills To Learn */}
              <div>
                <p className="text-sm font-semibold mb-1">
                  Skills You Want to Learn
                </p>
                <div className="flex gap-2">
                  <input
                    value={learnInput}
                    onChange={(e) => setLearnInput(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  />
                  <button
                    onClick={() =>
                      addSkill(
                        learnInput,
                        skillsToLearn,
                        setSkillsToLearn,
                        setLearnInput,
                        "skillsToLearn",
                      )
                    }
                    className="bg-green-600 text-white px-4 rounded-lg"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {skillsToLearn.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-green-100 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        onClick={() =>
                          removeSkill(
                            skill,
                            skillsToLearn,
                            setSkillsToLearn,
                            "skillsToLearn",
                          )
                        }
                        className="ml-2 text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>

                <button
                  onClick={handleLogout}
                  className="px-6 py-2 border border-red-200 text-red-600 rounded-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
