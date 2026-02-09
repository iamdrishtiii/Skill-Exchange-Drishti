const express = require("express");
const auth = require("../middleware/auth");
const {
  sendSwapRequest,
  getSentRequests,
  getReceivedRequests,
  acceptRequest,
  rejectRequest,
  deleteSentRequest,
} = require("../controllers/swapReqController");

const router = express.Router();
router.post("/swap-request", auth, sendSwapRequest);
router.get("/sent", auth, getSentRequests);
router.get("/received", auth, getReceivedRequests);
router.patch("/accept/:id", auth, acceptRequest);
router.patch("/reject/:id", auth, rejectRequest);
router.delete("/sent/:id", auth, deleteSentRequest);

module.exports = router;
