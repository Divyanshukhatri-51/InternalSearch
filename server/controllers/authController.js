const User = require('../models/User');
const { signToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);   
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(401).json({ error: 'User not found' });
  const match = await user.comparePassword(req.body.password);
  if (!match) return res.status(401).json({ error: 'Incorrect password' });
  const token = signToken(user);
  res.json({ token });
};
