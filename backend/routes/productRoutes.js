const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct } = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getProducts)
  .post(protect, createProduct);

router.route('/:id')
  .get(getProduct);

module.exports = router;
