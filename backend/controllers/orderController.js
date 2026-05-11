const Order = require('../models/Order');

// @desc    Place new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, deliveryFee, deliveryAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount,
      deliveryFee: deliveryFee || 50,
      deliveryAddress,
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order,
    });
  } catch (error) {
    console.error('createOrder error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Get user's orders
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort('-createdAt')
      .populate('items.product', 'productName image');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error('getOrders error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product', 'productName image price');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error('getOrder error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error('updateOrderStatus error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

module.exports = { createOrder, getOrders, getOrder, updateOrderStatus };
