const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  const token = generateToken(user._id);

  res.status(201).json({
    token,
  });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({
      email,
    });

    if (!user) {
      res.status(404).json({message:"User not found. Create an account"});
    }else if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.json({
          token,
      });
    } else {
      res.status(401).json({message:"Invalid credentials"});
    }
}

module.exports = { 
  registerUser, 
  loginUser
};
