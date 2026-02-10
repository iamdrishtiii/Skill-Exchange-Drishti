/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MdOutlineTimer } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { GiSandsOfTime } from "react-icons/gi";
import {
  acceptRequest,
  deleteSentRequest,
  fetchRequests,
  rejectRequest,
} from "../action";

const MyRequest = () => {
  const dispatch = useDispatch();
  const { requests, loading } = useSelector((state) => state);
  const [activeTab, setActiveTab] = useState("sent");
  const [statusFilter, setStatusFilter] = useState("All");
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth" />;
  }

  useEffect(() => {
    dispatch(fetchRequests(activeTab));
    // eslint-disable-next-line
  }, [activeTab]);

  const filteredRequests =
    statusFilter === "All"
      ? requests
      : requests.filter(
          (r) => r.status.toLowerCase() === statusFilter.toLowerCase(),
        );

  const handleAccept = (id) => {
    dispatch(acceptRequest(id));
  };

  const handleReject = (id) => {
    dispatch(rejectRequest(id));
  };

  const handleDelReq = (id) => {
    dispatch(deleteSentRequest(id));
  };
  const pendingCount = requests.filter(
    (req) => req.status === "pending",
  ).length;

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-amber-50 to-green-50 ">
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="min-h-screen px-6 py-8 w-full max-w-[1300px]">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl text-center font-semibold text-gray-800">
              Swap Requests
            </h1>
            <p className="text-center text-sm text-gray-500">
              Manage your incoming and outgoing skill exchange requests
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="flex">
              <button
                onClick={() => setActiveTab("sent")}
                className={`flex-1 py-3 text-sm font-medium transition ${
                  activeTab === "sent"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                Sent Requests
              </button>
              <button
                onClick={() => setActiveTab("received")}
                className={`flex-1 py-3 text-sm font-medium transition ${
                  activeTab === "received"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                Received Requests
              </button>
            </div>
          </div>

          {/* Filter */}
          <div className="flex justify-end mb-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Accepted</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          <div className="mb-2 ml-2 flex row font-semibold">
            <MdOutlineTimer className="text-xl pt-1 text-yellow-500" /> Pending
            Requests ({pendingCount}){" "}
          </div>

          {/* Content */}
          {loading ? (
            <p className="text-center text-gray-400">Loading requests...</p>
          ) : filteredRequests.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-10 text-center">
              <p className="text-gray-500 text-sm">
                {activeTab === "received"
                  ? "No received requests yet"
                  : "No sent requests yet"}
              </p>
            </div>
          ) : (
            <div>
              {filteredRequests.map((req) => {
                const user =
                  activeTab === "received" ? req.sender : req.receiver;

                return (
                  <div
                    key={req._id}
                    className={`bg-white p-4 rounded-lg shadow-sm mt-4 border-l-4
                    ${
                      req.status === "pending"
                        ? "border-l-yellow-300"
                        : req.status === "accepted"
                          ? " border-l-green-300"
                          : " border-l-red-300"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div>
                        {activeTab === "sent" ? (
                          <div className="flex flex-row gap-3">
                            <p className="bg-gray-200 w-fit rounded-full px-3 py-1 text-gray-500 font-bold">
                              {user?.name?.charAt(0)?.toUpperCase()}
                            </p>
                            <p className="text-sm  text-gray-800 flex flex-col">
                              <p className="font-medium"> To: {user.name}</p>
                              <p className="text-xs text-gray-500">
                                {formatDateTime(req.createdAt)}
                              </p>
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-row gap-3">
                            <p className="bg-gray-200 w-fit rounded-full px-3 py-1 text-gray-500 font-bold">
                              {user?.name?.charAt(0)?.toUpperCase()}
                            </p>
                            <p className="text-sm text-gray-800 flex flex-col">
                              <p className="font-medium"> From: {user.name}</p>
                              <p className="text-xs text-gray-500">
                                {formatDateTime(req.createdAt)}
                              </p>
                            </p>
                          </div>
                        )}
                      </div>
                      <span
                        className={`flex flex-row text-xs px-2 h-fit rounded-xl ${
                          req.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : req.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        <MdOutlineTimer className="text-lg pt-1" /> {req.status}
                      </span>
                    </div>

                    <div className="bg-blue-50 mt-2 p-2 text-xs flex justify-center ">
                      <div className="flex flex-col">
                        <div className="flex flex-row gap-4">
                          <p className="bg-blue-600 text-white px-1 rounded-xl pb-1">
                            {req.skillOffered || ""}
                          </p>{" "}
                          <FaLongArrowAltRight className="text-sm pt-1" />{" "}
                          {req.skillToLearn || ""}
                        </div>

                        <p className="text-blue-500">
                          I can offer you {req.skillOffered || ""} and want to
                          learn {req.skillToLearn || ""}{" "}
                        </p>
                      </div>
                    </div>

                    {req.message ? (
                      <div className="bg-blue-100 mt-2 py-1 px-2 ">
                        {req.message && (
                          <p className="text-xs text-blue-800 mt-2 flex flex-row gap-1">
                            <FiMessageSquare className="pt-1 text-lg" />{" "}
                            <p className="pb-1">{req.message}</p>
                          </p>
                        )}
                      </div>
                    ) : (
                      ""
                    )}

                    {activeTab === "sent" &&
                      (req.status === "pending" ? (
                        <div className="bg-yellow-100 py-1 px-2 mt-2 text-yellow-700 flex">
                          <GiSandsOfTime className="pt-1 text-lg" /> Waiting for{" "}
                          {user.name} to respond to Your request.
                        </div>
                      ) : req.status === "accepted" ? (
                        <div className="bg-green-100 py-1 px-2 mt-2 text-green-700">
                          {user.name} accepted your request.
                        </div>
                      ) : (
                        <div className="bg-red-100 py-1 px-2 mt-2 text-red-700">
                          {user.name} rejected your request.
                        </div>
                      ))}

                    {activeTab === "sent" && req.status === "pending" && (
                      <div className="flex justify-end ">
                        <button
                          onClick={() => handleDelReq(req._id)}
                          className="p-1 rounded-lg mt-1 bg-red-500 text-white"
                        >
                          Delete
                        </button>
                      </div>
                    )}

                    {activeTab === "received" && req.status === "pending" && (
                      <div className="flex gap-2 mt-3 justify-end">
                        <button
                          onClick={() => handleAccept(req._id)}
                          className="bg-green-500 text-white text-xs px-3 py-1 rounded-md hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(req._id)}
                          className="bg-red-500 text-white text-xs px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRequest;
