const mongoose = require('mongoose');

const careRecordSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Pet',
    },
    title: {
      type: String,
      required: [true, 'Please provide a record title'],
    },
    description: {
      type: String,
    },
    eventType: {
      type: String,
      enum: ['vaccination', 'medical', 'anniversary', 'routine'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CareRecord = mongoose.model('CareRecord', careRecordSchema);
module.exports = CareRecord;
