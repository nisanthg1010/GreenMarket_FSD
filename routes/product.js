const express = require('express');
const { getProducts, getSingleProducts } = require('../controllers/productControllers');
const router = express.Router(); // Create a new router

router.route('/products').get(getProducts); // Get all products
router.route('/product/:id').get(getSingleProducts); // Get a single product
module.exports = router; // Export the router
