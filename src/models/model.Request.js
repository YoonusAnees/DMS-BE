const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  location: { type: String, required: true },
  itemNeeded: { type: String, required: true },
  reason: { type: String },
  status: {
    type: String,
    enum: ["pending", "approved", "sent", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Request", requestSchema);
