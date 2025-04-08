const express =require('express');
const { createOrder } = require('../controllers/orderControllers');
const router = express.Router();

router.route('/order').post(createOrder);    // Add order items

module.exports = router;    // Export the router
