const express = require('express');
const router = express.Router();
const { getCrops, getCrop, addCrop, updateCrop, deleteCrop } = require('../controllers/cropController');
const { protect } = require('../middleware/auth');

router.use(protect); // All crop routes are protected

router.route('/')
  .get(getCrops)
  .post(addCrop);

router.route('/:id')
  .get(getCrop)
  .put(updateCrop)
  .delete(deleteCrop);

module.exports = router;
