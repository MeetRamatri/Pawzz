const mongoose = require('mongoose');

const rescueRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // The person who submitted the rescue request
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    description: {
      type: String,
      required: [true, 'Please provide a description of the animal emergency'],
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'completed'],
      default: 'pending',
    },
    assignedRescuer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // The user who accepted the rescue (must have 'rescuer' role)
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for GeoSpatial queries (e.g., "Find nearby unassigned rescues")
rescueRequestSchema.index({ location: '2dsphere' });

const RescueRequest = mongoose.model('RescueRequest', rescueRequestSchema);
module.exports = RescueRequest;
