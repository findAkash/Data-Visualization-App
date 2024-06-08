const jwt = require('jsonwebtoken');
const { unauthorized } = require('../constants/statusCodes');
const CONFIG = require('../config/config');

const verifyToken = (req, res, next) => {
  // get the token from the header
  const token = req.header('Authorization'); // format: Bearer <token>

  if (!token) {
    return res.status(unauthorized).json({ error: 'Unauthorized' });
  }

  // verify the validaty of the token
  try {
    const decoded = jwt.verify(token.split(' ')[1], CONFIG.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(unauthorized).json({ error: 'Unauthorized' });
  }
};

module.exports = { verifyToken };
