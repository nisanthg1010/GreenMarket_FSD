const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose.connect('mongodb+srv://nisanthg1010:EWJIJtwZZNdKF0i0@cluster0.k7zad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(con => {
      console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err.message);
    });
};

module.exports = connectDatabase; // Export the connectDatabase function
