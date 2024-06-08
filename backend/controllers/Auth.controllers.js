const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const statusCode = require('../constants/statusCodes');
const Token = require('../models/Tokens');
const {
  APIError,
  APIResponse,
  handleAsyncRequest,
} = require('../middleware/handleAsyncRequest');
const CONFIG = require('../config/config');

const login = handleAsyncRequest(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new APIError('Invalid email or password', statusCode.unauthorized);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new APIError('Invalid email or password', statusCode.unauthorized);
  }

  const tokenInstance = new Token();
  const { token, refreshToken } = await tokenInstance.generateToken(user._id);

  return new APIResponse(true, 'Login successful', {
    user,
    token,
    refreshToken,
  });
});

const refreshToken = handleAsyncRequest(async (req, res, next) => {
  const refreshToken = req.header('Authorization')?.split(' ')[1];

  if (!refreshToken) {
    throw new APIError('Refresh token is required', statusCode.badRequest);
  }

  const token = await Token.findOne({ token: refreshToken });
  if (!token) {
    throw new APIError('Invalid refresh token', statusCode.badRequest);
  }

  const decoded = jwt.verify(refreshToken, CONFIG.REFRESH_SECRET);
  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new APIError('User not found', statusCode.notFound);
  }

  const newTokens = await new Token().generateToken(user._id);
  return new APIResponse(true, 'Token refreshed successfully', newTokens);
});

const logout = handleAsyncRequest(async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    throw new APIError('Token is required', statusCode.badRequest);
  }

  await Token.findOneAndDelete({ token });

  return new APIResponse(true, 'Logout successful');
});

const createUser = async (req, res, next) => {
  const userExist = await User.findOne({ email: 'akash@madkudu.com' });

  if (userExist) {
    return new APIResponse(true, 'User already exists');
  }

  const { name, email, password } = {
    name: 'Akash',
    email: 'akash@madkudu.com',
    password: 'password',
  };

  const user = new User({ name, email, password });
  await user.save();
  return;
};

module.exports = { login, refreshToken, logout, createUser };
