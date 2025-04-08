const ProductModel = require('../models/productModel');

exports.getProducts = async (req, res, next) => {
    try {
      const products = await ProductModel.find();
      console.log("Fetched products:", products); // Log the fetched products
  
      if (!products.length) {
        console.log("No products found in the database.");
      }
  
      res.json({
        success: true,
        products,
      });
    } catch (error) {
      console.error("Error fetching products:", error.message);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  


exports.getSingleProducts = async (req,res,next) => {
    try {
    const product=await ProductModel.findById(req.params.id); 

    res.json({
        success: true,
        message: 'Get Single product workings!'
    })}
    catch(error){
        res.json({
            success: false,
            message:error.message
        })
    }
}