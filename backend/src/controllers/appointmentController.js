const Appointment = require('../models/Appointment');
const Clinic = require('../models/Clinic');

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private
const bookAppointment = async (req, res) => {
  try {
    const { clinicId, petId, date, timeSlot, serviceName } = req.body;

    const appointment = await Appointment.create({
      user: req.user._id,
      clinic: clinicId,
      pet: petId,
      date,
      timeSlot,
      serviceName,
      status: 'scheduled'
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get appointments for a specific vet (based on owned clinics)
// @route   GET /api/appointments/vet
// @access  Private (Vet only)
const getVetAppointments = async (req, res) => {
  try {
    // 1. Find all clinics owned by this logged-in vet
    const clinics = await Clinic.find({ owner: req.user._id });
    const clinicIds = clinics.map(c => c._id);

    // 2. Find all appointments mapped to those clinics
    const appointments = await Appointment.find({ clinic: { $in: clinicIds } })
      .populate('user', 'name email')
      .populate('pet', 'name species breed image')
      .populate('clinic', 'name')
      .sort({ date: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private (Vet only)
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appt = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(appt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  bookAppointment,
  getVetAppointments,
  updateAppointmentStatus
};
