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

module.exports = {
  registerRescuer,
};
