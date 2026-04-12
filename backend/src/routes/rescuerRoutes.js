const express = require('express');
const router = express.Router();
const { registerRescuer } = require('../controllers/rescuerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, registerRescuer);

module.exports = router;
