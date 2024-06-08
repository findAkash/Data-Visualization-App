const mongoose = require('mongoose');
const CONFIG = require('../config/config');
const jwt = require('jsonwebtoken');

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date, required: true },
});

tokenSchema.methods.generateToken = function (userId) {
  const token = jwt.sign({ userId }, CONFIG.JWT_SECRET, {
    expiresIn: `${CONFIG.TOKEN_EXPIRY}d`,
  });
  const refreshToken = jwt.sign({ userId }, CONFIG.JWT_SECRET, {
    expiresIn: `${CONFIG.REFREST_TOKEN_EXPIRY}d`,
  });

  new Token({
    token: refreshToken,
    userId: userId,
    expiresAt: new Date(
      Date.now() + CONFIG.REFREST_TOKEN_EXPIRY * 24 * 60 * 60 * 1000
    ),
  }).save();
  return { token, refreshToken };
};

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
