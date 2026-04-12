const mongoose = require('mongoose');

const petSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please provide the pet\'s name'],
    },
    species: {
      type: String, // e.g., 'Dog', 'Cat'
      required: [true, 'Please provide the species'],
    },
    breed: {
      type: String, // e.g., 'Labrador retriever', 'Shorthair'
    },
    image: {
      type: String, // URL to image
    },
    dob: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;
