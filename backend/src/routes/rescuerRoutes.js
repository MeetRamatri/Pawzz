const express = require('express');
const router = express.Router();
const { registerRescuer, updateRescuer, getRescuerByUserId, updateRescuerStatus } = require('../controllers/rescuerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, registerRescuer);
router.route('/:id').put(protect, updateRescuer);
router.route('/user/:userId').get(getRescuerByUserId);
router.route('/me/status').put(protect, updateRescuerStatus);

module.exports = router;
