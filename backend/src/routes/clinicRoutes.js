const express = require('express');
const router = express.Router();
const {
  createClinic,
  getClinics,
  getClinicById,
  updateClinic,
  getMyClinics,
} = require('../controllers/clinicController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(getClinics)
  .post(protect, authorizeRoles('vet'), createClinic);

router
  .route('/:id')
  .get(getClinicById)
  .put(protect, authorizeRoles('vet'), updateClinic);

router
  .route('/my-clinics')
  .get(protect, authorizeRoles('vet'), getMyClinics);

module.exports = router;
