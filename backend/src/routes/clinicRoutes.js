const express = require('express');
const router = express.Router();
const {
  createClinic,
  getClinics,
  getClinicById,
} = require('../controllers/clinicController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(getClinics)
  .post(protect, authorizeRoles('vet'), createClinic);

router
  .route('/:id')
  .get(getClinicById);

module.exports = router;
