const Crop = require('../models/Crop');

// @desc    Get all crops for logged-in farmer
// @route   GET /api/crops
// @access  Private
const getCrops = async (req, res, next) => {
  try {
    const crops = await Crop.find({ farmerId: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: crops.length,
      data: crops,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single crop
// @route   GET /api/crops/:id
// @access  Private
const getCrop = async (req, res, next) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({ success: false, message: 'Crop not found' });
    }

    // Verify ownership
    if (crop.farmerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({ success: true, data: crop });
  } catch (error) {
    next(error);
  }
};

// @desc    Add new crop
// @route   POST /api/crops
// @access  Private
const addCrop = async (req, res, next) => {
  try {
    req.body.farmerId = req.user.id;

    const crop = await Crop.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Crop added successfully',
      data: crop,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update crop
// @route   PUT /api/crops/:id
// @access  Private
const updateCrop = async (req, res, next) => {
  try {
    let crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({ success: false, message: 'Crop not found' });
    }

    if (crop.farmerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    crop = await Crop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: crop });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete crop
// @route   DELETE /api/crops/:id
// @access  Private
const deleteCrop = async (req, res, next) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({ success: false, message: 'Crop not found' });
    }

    if (crop.farmerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await crop.deleteOne();

    res.status(200).json({ success: true, message: 'Crop deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCrops, getCrop, addCrop, updateCrop, deleteCrop };
