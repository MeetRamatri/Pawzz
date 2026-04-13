const express = require('express');
const router = express.Router();
const {
  createRescueRequest,
  getMyRescueRequests,
  getNearbyPendingRequests,
  acceptRescueRequest,
  declineRescueRequest,
  getPublicRescueRequests,
} = require('../controllers/rescueRequestController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public route for prototype mockup
router.route('/public').get(getPublicRescueRequests);

// Users can create and view their own requests
router.route('/')
  .post(protect, createRescueRequest);

router.route('/my-requests')
  .get(protect, getMyRescueRequests);

// Rescuers can search nearby pending requests
router.route('/nearby')
  .get(protect, authorizeRoles('rescuer'), getNearbyPendingRequests);

// Rescuers can accept or decline specific requests
router.route('/:id/accept')
  .put(protect, authorizeRoles('rescuer'), acceptRescueRequest);

router.route('/:id/decline')
  .put(protect, authorizeRoles('rescuer'), declineRescueRequest);

module.exports = router;
