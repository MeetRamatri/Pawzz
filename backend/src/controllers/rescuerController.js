const Rescuer = require('../models/Rescuer');
const User = require('../models/User');

const registerRescuer = async (req, res) => {
  try {
    const { location } = req.body;

    const existingRescuer = await Rescuer.findOne({ user: req.user._id });
    if (existingRescuer) {
      return res.status(400).json({ message: 'User is already registered as a rescuer' });
    }

    const rescuer = await Rescuer.create({
      user: req.user._id,
      location,
    });

    // Automatically elevate the user's base role to 'rescuer'
    await User.findByIdAndUpdate(req.user._id, { role: 'rescuer' });

    res.status(201).json(rescuer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateRescuer = async (req, res) => {
  try {
    const rescuer = await Rescuer.findById(req.params.id);

    if (!rescuer) {
      return res.status(404).json({ message: 'Rescuer profile not found' });
    }

    // Check if the user owns this rescuer profile
    if (rescuer.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this rescuer profile' });
    }

    const updatedRescuer = await Rescuer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedRescuer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRescuerByUserId = async (req, res) => {
  try {
    const rescuer = await Rescuer.findOne({ user: req.params.userId });

    if (!rescuer) {
      return res.status(404).json({ message: 'Rescuer profile not found' });
    }

    res.json(rescuer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRescuerStatus = async (req, res) => {
  try {
    const { availability, location } = req.body;
    const rescuer = await Rescuer.findOne({ user: req.user._id });

    if (!rescuer) {
      return res.status(404).json({ message: 'Rescuer profile not found' });
    }

    const updateData = {};
    if (availability !== undefined) updateData.availability = availability;
    if (location) updateData.location = location;

    const updatedRescuer = await Rescuer.findByIdAndUpdate(
      rescuer._id,
      updateData,
      { new: true }
    );

    res.json(updatedRescuer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerRescuer,
  updateRescuer,
  getRescuerByUserId,
  updateRescuerStatus,
};
