const express = require('express');
const router = express.Router();
const { addPet, getUserPets } = require('../controllers/petController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getUserPets).post(protect, addPet);

module.exports = router;
