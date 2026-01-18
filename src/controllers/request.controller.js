const Request = require("../models/model.Request");

// Public: create request
exports.createRequest = async (req, res) => {
  try {
    const data = await Request.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: update status
// exports.updateStatus = async (req, res) => {
//   try {
//     const request = await Request.findByIdAndUpdate(
//       req.params.id,
//       { status: req.body.status },
//       { new: true }
//     );
//     res.json(request);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };


// In your request controller file
exports.updateStatus = async (req, res) => {
  try {
    const { status, phoneNumber } = req.body;
    
    // Find the request first to get phone number
    const request = await Request.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Update the request status
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // Send notification based on status
    if (status === "sent" || status === "completed") {
      let message = "";
      
      if (status === "sent") {
        message = `Goods sent for your request: ${request.itemNeeded}`;
      } else if (status === "completed") {
        message = `Goods ready to dispatch for your request: ${request.itemNeeded}`;
      }

      // Send SMS notification using Notifer
      try {
        // You need to install and configure Notifer SDK
        // Example with fetch API if using Notifer's REST API
        await fetch('https://api.notifer.example.com/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: request.contact, // Assuming contact field contains phone
            message: message,
            // Add other required Notifer parameters
          })
        });
      } catch (notifError) {
        console.error("Notification failed:", notifError);
        // Don't fail the request if notification fails
      }
    }

    res.json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
