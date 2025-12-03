const router = require("express").Router();
const { createRequest, getAllRequests, updateStatus } = require("../controllers/request.controller");
const auth = require("../middleware/auth");

// Public endpoint
router.post("/", createRequest);

// Admin only
router.get("/", auth, getAllRequests);
router.put("/:id", auth, updateStatus);

module.exports = router;
