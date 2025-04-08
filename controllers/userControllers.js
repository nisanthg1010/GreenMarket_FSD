const User = require('../models/userModel');

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    const token = user.getJwtToken();

    res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
