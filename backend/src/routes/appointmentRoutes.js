const express = require('express');
const router = express.Router();
const { bookAppointment, getVetAppointments, updateAppointmentStatus } = require('../controllers/appointmentController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/').post(protect, bookAppointment);
router.route('/vet').get(protect, authorizeRoles('vet', 'admin'), getVetAppointments);
router.route('/:id/status').put(protect, authorizeRoles('vet', 'admin'), updateAppointmentStatus);

module.exports = router;
