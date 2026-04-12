const mongoose = require('mongoose');

const rescuerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    availability: {
      type: Boolean,
      default: true,
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

// Indexes for GeoSpatial queries (e.g., "Alert nearby rescuers")
rescuerSchema.index({ location: '2dsphere' });

const Rescuer = mongoose.model('Rescuer', rescuerSchema);
module.exports = Rescuer;
