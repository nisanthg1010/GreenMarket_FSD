const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');

//create Order - /api/v1/order
exports.createOrder = async (req,res,next) => {
    const cartItems = req.body;
    const amount = Number (cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2);
    const status =  'pending';

   const order = await orderModel.create({ cartItems, amount, status }) 
   
   //updating product stock 
   const updateCartItemsStock = async (cartItems) => {
    try {
      for (const item of cartItems) {
        try {
          const product = await productModel.findById(item.product._id);
  
          if (!product) {
            throw new Error(`Product with ID ${item.product._id} not found`);
          }
  
          if (product.stock < item.qty) {
            throw new Error(
              `Insufficient stock for product: ${product.name}. Available stock: ${product.stock}, Requested: ${item.qty}`
            );
          }
  
          product.stock = product.stock - item.qty;
          await product.save();
          console.log(`Stock updated for product: ${product.name}`);
        } catch (innerError) {
          console.error(`Error processing product ID ${item.product._id}:`, innerError.message);
        }
      }
      console.log("Stock update completed!");
    } catch (error) {
      console.error("Unexpected error while updating stock:", error.message);
    }
  };
  
  // Call the function
  await updateCartItemsStock(cartItems);
  
   
   

    res.json({
        success: true,
        order
    })
}