const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  ratings: Number,
  images:[
    {
      image: String
    }
  ],
  category: String,
  seller: String,
  stock: Number,
  NumberOfReviews: Number,
  createAt: Date
});

const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;
