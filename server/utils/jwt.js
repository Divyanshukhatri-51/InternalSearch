const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function signToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, SECRET, { expiresIn: '2h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

module.exports = { signToken, verifyToken };
