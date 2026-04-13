const RescueRequest = require('../models/RescueRequest');

// @desc    Create a rescue request
// @route   POST /api/rescue-requests
// @access  Private
const createRescueRequest = async (req, res) => {
  try {
    const { location, description } = req.body;

    const request = await RescueRequest.create({
      user: req.user._id,
      location,
      description,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get logged in user's rescue requests
// @route   GET /api/rescue-requests/my-requests
// @access  Private
const getMyRescueRequests = async (req, res) => {
  try {
    const requests = await RescueRequest.find({ user: req.user._id })
      .populate('assignedRescuer', 'name email');
    
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get nearby pending rescue requests
// @route   GET /api/rescue-requests/nearby
// @access  Private (rescuer only)
const getNearbyPendingRequests = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: 'Please provide lat and lng query parameters' });
    }

    const requests = await RescueRequest.find({
      status: 'pending',
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          ...(radius && { $maxDistance: parseFloat(radius) * 1000 }), // default radius in km
        },
      },
    }).populate('user', 'name'); // Show the reporter's name to the rescuer

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all public ongoing/pending rescues (for prototype unauthenticated UI)
// @route   GET /api/rescue-requests/public
// @access  Public
const getPublicRescueRequests = async (req, res) => {
  try {
    const requests = await RescueRequest.find()
      .populate('user', 'name email')
      .populate('assignedRescuer')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Accept a rescue request
// @route   PUT /api/rescue-requests/:id/accept
// @access  Private (rescuer only)
const acceptRescueRequest = async (req, res) => {
  try {
    const request = await RescueRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Rescue request not found' });
    }

    // Only allow accepting if it's currently pending
    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Request is already accepted or completed' });
    }

    request.status = 'accepted';
    request.assignedRescuer = req.user._id;

    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Decline a rescue request
// @route   PUT /api/rescue-requests/:id/decline
// @access  Private (rescuer only)
const declineRescueRequest = async (req, res) => {
  try {
    const request = await RescueRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Rescue request not found' });
    }

    // Only allow declining if it's currently pending
    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Request is already accepted or completed' });
    }

    request.status = 'completed'; // Mark as completed (declined)
    // Don't assign rescuer for declined requests

    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRescueRequest,
  getMyRescueRequests,
  getNearbyPendingRequests,
  acceptRescueRequest,
  declineRescueRequest,
  getPublicRescueRequests,
};
