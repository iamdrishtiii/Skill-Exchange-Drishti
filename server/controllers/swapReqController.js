const swapRequest = require("../models/swapReqModel");

const sendSwapRequest = async (req, res) => {
  try {
    const senderId = req.user.userId;
    const { receiverId, skillOffered, skillToLearn, message } = req.body;

    if (!receiverId || !skillOffered || !skillToLearn) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Prevent sending request to yourself
    if (senderId === receiverId) {
      return res
        .status(400)
        .json({ error: "You cannot send request to yourself" });
    }

    const newRequest = await swapRequest.create({
      sender: senderId,
      receiver: receiverId,
      skillOffered,
      skillToLearn,
      message,
    });

    res.status(201).json({
      message: "Swap request sent successfully",
      request: newRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send request" });
  }
};

// Get received requests
const getReceivedRequests = async (req, res) => {
  try {
    const requests = await swapRequest.find({
      receiver: req.user.userId,
    })
      .populate("sender", "name location")
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch received requests" });
  }
};

// Get sent requests
const getSentRequests = async (req, res) => {
  try {
    const requests = await swapRequest.find({
      sender: req.user.userId,
    })
      .populate("receiver", "name location")
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sent requests" });
  }
};

// ACCEPT request
const acceptRequest = async (req, res) => {
  try {
    const request = await swapRequest.findOneAndUpdate(
      {
        _id: req.params.id,
        receiver: req.user.userId, // only receiver can accept
      },
      { status: "accepted" },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.json({ message: "Request accepted", request });
  } catch (error) {
    res.status(500).json({ error: "Failed to accept request" });
  }
};

// REJECT request
const rejectRequest = async (req, res) => {
  try {
    const request = await swapRequest.findOneAndUpdate(
      {
        _id: req.params.id,
        receiver: req.user.userId,
      },
      { status: "rejected" },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.json({ message: "Request rejected", request });
  } catch (error) {
    res.status(500).json({ error: "Failed to reject request" });
  }
};

const deleteSentRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await swapRequest.findOne({
      _id: id,
      sender: req.user.userId, // only sender can delete
      status: "pending",       // optional safety
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    await request.deleteOne();

    res.json({ message: "Request cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete request" });
  }
};


module.exports = { sendSwapRequest, getSentRequests, getReceivedRequests,acceptRequest,rejectRequest , deleteSentRequest };
