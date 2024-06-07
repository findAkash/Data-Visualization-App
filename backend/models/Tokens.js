const mongoose = require('mongoose');
const CONFIG = require('../config/config');

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

tokenSchema.methods.generateToken = function (userId) {
  const token = jwt.sign({ userId }, CONFIG.SECRET, {
    expiresIn: `${CONFIG.TOKEN_EXPIRATION_TIME}d`,
  });
  const refreshToken = jwt.sign({ userId }, CONFIG.REFRESH_SECRET, {
    expiresIn: `${CONFIG.REFRESH_TOKEN_EXPIRATION_TIME}d`,
  });

  new Token({
    refreshToken,
    userId,
    expiresAt: new Date(
      Date.now() + CONFIG.REFRESH_TOKEN_EXPIRATION_TIME * 24 * 60 * 60 * 1000
    ),
  }).save();
  return token, refreshToken;
};

const Token = mongoose.model('Token', tokenSchema);
