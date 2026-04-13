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
    services: [{
      name: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String }
    }],
    image: {
      type: String,
    },
    gallery: {
      type: [String], // Array of URLs for collage
    },
    rating: {
      type: Number,
      min: [0, 'Rating must be at least 0'],
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
