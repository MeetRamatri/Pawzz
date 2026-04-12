const Clinic = require('../models/Clinic');

const createClinic = async (req, res) => {
  try {
    const { name, address, services, location, rating } = req.body;

    const clinic = await Clinic.create({
      name,
      address,
      services,
      location,
      rating,
      owner: req.user._id, // Set the owner statically from the verified JWT
    });

    res.status(201).json(clinic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getClinics = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    let query = {};

    if (lat && lng) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          ...(radius && { $maxDistance: parseFloat(radius) * 1000 }), // default radius in km
        },
      };
    }

    const clinics = await Clinic.find(query).populate('owner', 'name email');
    res.json(clinics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id).populate('owner', 'name email');

    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }

    res.json(clinic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createClinic,
  getClinics,
  getClinicById,
};
