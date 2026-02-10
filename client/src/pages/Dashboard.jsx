import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { GoPeople } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineTimer } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaLongArrowAltRight } from "react-icons/fa";
import { fetchProfiles, sendSwapRequest } from "../action";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector((state) => state);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [Search, setSearch] = useState("");
  const [availabilityCat, setAvailabilityCat] = useState("");
  const [skillWantToOffered, setSkillWantToOffered] = useState("");
  const [skillWantToLearn, setSkillWantToLearn] = useState("");
  const [message, setMessage] = useState("");
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterData = profiles
    .filter(
      (t) =>
        t.name.trim().toLowerCase().startsWith(Search.toLowerCase()) ||
        t.skillsOffered.some((skill) =>
          skill.trim().toLowerCase().startsWith(Search.toLowerCase()),
        ),
    )
    .filter((t) =>
      availabilityCat ? t.availability === availabilityCat : true,
    );

  const handleSendReq = (e) => {
    e.preventDefault();

    if (!skillWantToLearn || !skillWantToOffered) {
      toast.error("Please select both skills");
      return;
    }

    dispatch(
      sendSwapRequest({
        receiverId: selectedProfile._id,
        skillOffered: skillWantToOffered,
        skillToLearn: skillWantToLearn,
        message,
      }),
    );

    setOpenModal(false);
    setSkillWantToLearn("");
    setSkillWantToOffered("");
    setMessage("");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const isOwnProfile = (profileEmail) => {
    return user?.email === profileEmail;
  };

  let count = filterData.length;

  return (
    <>
      {token ? (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-amber-50 to-green-50 ">
          <Navbar />
          <div className="flex justify-center items-center">
            <div className="w-full max-w-[1400px]">
              <h1 className="text-center text-lg mt-6 md:text-3xl font-semibold md:font-bold">
                Find Your Perfect Skill Exchange
              </h1>
              <h1 className="text-center text-sm mt-2 md:text-lg text-gray-600">
                Connect with talented individuals and exchange skills to grow
                together
              </h1>
              {/* Search and Availability filter */}
              <div className="px-2 sm:px-10 py-7 mx-4 sm:mx-10 my-4 flex items-center">
                <input
                  placeholder="Search by Name or Skill you want.. "
                  onChange={handleSearch}
                  value={Search}
                  className="flex-1 border-2 border-gray-200 focus:outline-none text-sm sm:text-md text-gray-600 py-2 px-2 sm:px-4 min-w-[100px] "
                />
                <select
                  value={availabilityCat}
                  onChange={(e) => setAvailabilityCat(e.target.value)}
                  className="border-2 text-sm sm:text-md border-gray-200 focus:outline-none text-gray-500 py-2 px-1 sm:px-4"
                >
                  <option value="">Availability</option>
                  <option value="Flexible">Flexible</option>
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                </select>
              </div>

              <p className=" px-16 sm:px-28 py-4 sm:py-4 flex flex-row gap-2">
                <GoPeople className="text-xl" />
                {count} people available
              </p>
              {loading ? (
                <div className=" mt-10 h-[60vh] flex flex-col items-center ">
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin "></div>
                  <p className="mt-3 text-gray-400">Loading Profiles...</p>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <div className=" grid grid-cols-1 w-[300px] sm:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-10 pb-10  ">
                    {filterData.map((profile) => (
                      <div
                        key={profile._id}
                        className="bg-white rounded-xl border p-6 shadow-sm"
                      >
                        <div>
                          {/* Profile pic */}
                          <div className="flex flex-row gap-3">
                            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
                              {profile.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-semibold px-2 text-md">
                                {profile.name}
                              </h3>
                              <p className="text-sm text-gray-500 flex flex-row">
                                <CiLocationOn className="pt-1 text-lg" />
                                {profile.location}
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs mt-3 text-gray-500">
                              {profile.email}
                            </p>

                            {/* Skills Offered */}
                            <div className="mt-1">
                              <p className="text-xs font-medium text-gray-600">
                                Skills Offered
                              </p>
                              <div className="flex gap-2 mt-1">
                                {profile.skillsOffered.map((skill) => (
                                  <span
                                    key={skill}
                                    className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Skills Wanted */}
                            <div className="mt-3">
                              <p className="text-xs font-medium text-gray-600">
                                Skills Wanted
                              </p>
                              <div className="flex gap-2 mt-1">
                                {profile.skillsToLearn.map((skill) => (
                                  <span
                                    key={skill}
                                    className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Availability */}
                            <p className="flex items-center gap-1 text-xs text-gray-500 mt-3 flex flex-row">
                              <MdOutlineTimer className="text-sm" />{" "}
                              {profile.availability}
                            </p>

                            <div className="text-center">
                              <button
                                disabled={isOwnProfile(profile.email)}
                                className={` text-sm px-4 py-2 rounded-lg mt-4 text-white 
                                ${
                                  isOwnProfile(profile.email)
                                    ? "bg-gray-500 "
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                                onClick={() => {
                                  setSelectedProfile(profile);
                                  setOpenModal(true);
                                }}
                              >
                                Request Swap
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-amber-50 to-green-50 ">
          <Navbar />
          <div className="flex pt-[5%] items-center justify-center px-6">
            <div className="max-w-5xl text-center bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-lg md:flex md:flex-row">
              <div>
                <img src="../Exchange.jpg" alt="" />
              </div>

              <div className="md:w-1/2">
                {" "}
                <h1 className="text-4xl font-bold text-blue-700 mb-4">
                  Exchange Skills, Grow Together
                </h1>
                <p className="text-gray-600 text-lg mb-8">
                  Share what you know. Learn what you love. Connect with people
                  who believe in learning through collaboration.
                </p>
                <button
                  onClick={() => navigate("/auth")}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
                >
                  Let’s Start
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {openModal && selectedProfile && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60">
          <div className="bg-white px-6 py-4 w-[90%] max-w-md rounded-xl shadow-lg relative">
            {/* Close btn */}
            <button
              className="absolute top-4 right-4 text-gray-400 text-xl hover:text-gray-600"
              onClick={() => setOpenModal(false)}
            >
              <RxCross2 />
            </button>

            <h1 className="text-md font-semibold text-gray-800">
              Request Skill Exchange
            </h1>
            <h1 className="text-xs text-gray-500">
              Propose a Skill Exchange with {selectedProfile.name}
            </h1>

            <div className="relative  bg-gray-100 p-2 my-2">
              <div className="rounded-full bg-gray-300 w-fit px-3 py-1 font-bold text-gray-600">
                {selectedProfile.name[0].toUpperCase()}
              </div>
              <div className="absolute text-xs top-1 left-14">
                <p>{selectedProfile.name}</p>
                <p className="text-gray-600">{selectedProfile.location}</p>
              </div>
            </div>

            <form>
              <div className="flex flex-row">
                <div className="w-1/2 text-xs flex flex-col px-1">
                  <label className="mb-1">I can offer:</label>
                  <select
                    value={skillWantToLearn}
                    onChange={(e) => setSkillWantToLearn(e.target.value)}
                    className="border-gray-300 border-2 rounded-md p-1"
                  >
                    <option value="">Select a Skill</option>
                    {selectedProfile.skillsToLearn.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2 flex flex-col text-xs px-1">
                  <label className="mb-1">I want to learn:</label>
                  <select
                    value={skillWantToOffered}
                    onChange={(e) => setSkillWantToOffered(e.target.value)}
                    className="border-gray-300 border-2 rounded-md p-1"
                  >
                    <option value="">Select a Skill</option>
                    {selectedProfile.skillsOffered.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {(skillWantToLearn || skillWantToOffered) && (
                <div className="bg-blue-50 mt-2 p-2 flex flex-col items-center justify-center text-xs">
                  <div className=" flex flex-row gap-4">
                    <p className="bg-blue-600 text-white px-1 rounded-xl pb-1">
                      {skillWantToOffered || ""}
                    </p>{" "}
                    <FaLongArrowAltRight className="text-sm pt-1" />{" "}
                    {skillWantToLearn || ""}
                  </div>

                  <p className="text-blue-500">
                    I can offer you {skillWantToOffered || ""} and want to learn{" "}
                    {skillWantToLearn || ""}{" "}
                  </p>
                </div>
              )}

              <p className="text-xs mt-2">Message(optional)</p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                placeholder="Introduce yourself and explain why you want to exchange skills.."
                className="border-2 text-xs w-full p-1"
              />

              <div className="gap-2 text-sm text-right">
                <button
                  onClick={() => setOpenModal(false)}
                  className="border-gray-100 border-2 rounded-xl py-1 px-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReq}
                  className="bg-blue-500 text-white py-1 px-2 rounded-md"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
