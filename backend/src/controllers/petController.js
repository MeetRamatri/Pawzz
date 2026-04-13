const Pet = require('../models/Pet');

// @desc    Add a new pet for the logged-in user
// @route   POST /api/pets
// @access  Private
const addPet = async (req, res) => {
  try {
    const { name, species, breed, age, image } = req.body;

    const petData = {
      owner: req.user._id,
      name,
      species,
      breed,
      image,
    };

    // If age is provided, calculate DOB (approximate)
    if (age) {
      const currentYear = new Date().getFullYear();
      const birthYear = currentYear - parseInt(age);
      petData.dob = new Date(birthYear, 0, 1); // January 1st of birth year
    }

    const pet = await Pet.create(petData);

    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all pets for the logged-in user
// @route   GET /api/pets
// @access  Private
const getUserPets = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user._id });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addPet,
  getUserPets,
};
