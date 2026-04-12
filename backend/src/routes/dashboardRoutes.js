const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');

// GET /api/dashboard/:email - Public bypass route for frontend mockups
router.route('/:email').get(getDashboardData);

module.exports = router;
