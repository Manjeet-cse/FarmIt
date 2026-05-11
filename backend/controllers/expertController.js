const User = require('../models/User');
const ExpertBooking = require('../models/ExpertBooking');

// @desc    Get all experts
// @route   GET /api/experts
// @access  Public
const getExperts = async (req, res) => {
  try {
    const experts = await User.find({ role: 'expert' }).select('-password');

    res.status(200).json({
      success: true,
      count: experts.length,
      data: experts,
    });
  } catch (error) {
    console.error('getExperts error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings
// @access  Private
const getBookings = async (req, res) => {
  try {
    const bookings = await ExpertBooking.find({ farmerId: req.user.id })
      .sort('-createdAt')
      .populate('expertId', 'name profileImage');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('getBookings error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Create expert booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { expertId, bookingType, bookingDate, bookingTime, topic, duration } = req.body;

    // Verify expert exists
    const expert = await User.findOne({ _id: expertId, role: 'expert' });
    if (!expert) {
      return res.status(404).json({ success: false, message: 'Expert not found' });
    }

    const booking = await ExpertBooking.create({
      farmerId: req.user.id,
      expertId,
      bookingType,
      bookingDate,
      bookingTime,
      topic: topic || '',
      duration: duration || 30,
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    console.error('createBooking error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private
const updateBooking = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    let booking = await ExpertBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Only farmer or expert can update
    if (
      booking.farmerId.toString() !== req.user.id &&
      booking.expertId.toString() !== req.user.id
    ) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (status) booking.status = status;
    if (paymentStatus) booking.paymentStatus = paymentStatus;

    await booking.save();

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error('updateBooking error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

module.exports = { getExperts, getBookings, createBooking, updateBooking };
