const express = require('express');
const router = express.Router();
const { getExperts, getBookings, createBooking, updateBooking } = require('../controllers/expertController');
const { protect } = require('../middleware/auth');

// Public
router.get('/experts', getExperts);

// Protected
router.get('/bookings', protect, getBookings);
router.post('/bookings', protect, createBooking);
router.put('/bookings/:id', protect, updateBooking);

module.exports = router;
