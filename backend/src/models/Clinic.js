const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Vet user that owns this clinic
    },
    name: {
      type: String,
      required: [true, 'Please add a clinic name'],
    },
    address: {
      type: String,
      required: [true, 'Please add a physical address'],
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true, // [longitude, latitude]
      },
    },
    services: {
      type: [String],
      required: [true, 'Please add at least one service (e.g., Vaccination, Surgery)'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for GeoSpatial queries (e.g., "Find nearby clinics")
clinicSchema.index({ location: '2dsphere' });

const Clinic = mongoose.model('Clinic', clinicSchema);
module.exports = Clinic;
