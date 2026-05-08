const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: [true, 'Please add a crop name'],
    trim: true,
  },
  variety: {
    type: String,
    default: '',
  },
  growthPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  cropStage: {
    type: String,
    enum: ['Sowing', 'Growing', 'Flowering', 'Grain Filling', 'Harvesting'],
    default: 'Sowing',
  },
  healthStatus: {
    type: String,
    enum: ['Healthy', 'Needs Attention', 'Critical'],
    default: 'Healthy',
  },
  diseaseRisk: {
    type: String,
    default: 'None',
  },
  soilMoisture: {
    type: Number,
    min: 0,
    max: 100,
  },
  acreage: {
    type: Number,
    default: 0,
  },
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  nextAction: {
    type: String,
    default: '',
  },
  nextActionDate: {
    type: Date,
  },
  image: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Crop', cropSchema);
