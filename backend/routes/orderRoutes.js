const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrder, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

router.use(protect); // All order routes are protected

router.route('/')
  .get(getOrders)
  .post(createOrder);

router.route('/:id')
  .get(getOrder);

router.put('/:id/status', updateOrderStatus);

module.exports = router;
