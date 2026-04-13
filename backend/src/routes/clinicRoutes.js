const express = require('express');
const router = express.Router();
const {
  createClinic,
  getClinics,
  getClinicById,
  updateClinic,
  getMyClinics,
  deleteClinic,
} = require('../controllers/clinicController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(getClinics)
  .post(protect, authorizeRoles('vet'), createClinic);

router
  .route('/my-clinics')
  .get(protect, authorizeRoles('vet'), getMyClinics);

router
  .route('/:id')
  .get(getClinicById)
  .put(protect, authorizeRoles('vet'), updateClinic)
  .delete(protect, authorizeRoles('vet'), deleteClinic);

module.exports = router;
