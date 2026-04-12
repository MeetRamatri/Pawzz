const User = require('../models/User');
const Pet = require('../models/Pet');
const Appointment = require('../models/Appointment');
const CareRecord = require('../models/CareRecord');

// @desc    Get complete dashboard data for a user (prototype bypass auth)
// @route   GET /api/dashboard/:email
// @access  Public (Prototype)
const getDashboardData = async (req, res) => {
  try {
    const { email } = req.params;

    // Fetch Base User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Run aggregations concurrently for speed
    const [pets, appointments, careTimeline] = await Promise.all([
      Pet.find({ owner: user._id }),
      Appointment.find({ user: user._id })
        .populate('clinic', 'name address')
        .sort({ date: 1 }), // Closest scheduled dates first
      CareRecord.find({})
        .populate({
          path: 'pet',
          match: { owner: user._id },
          select: 'name image'
        })
        .sort({ date: -1 }) // Newest first
    ]);

    // Clean CareRecords matching this user's pets (since query might pull all, then null out pet mismatches via populate)
    const filteredCareTimeline = careTimeline.filter(record => record.pet != null);

    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      },
      pets,
      appointments,
      careTimeline: filteredCareTimeline
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardData
};
